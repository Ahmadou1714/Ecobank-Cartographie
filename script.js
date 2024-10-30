'use strict';

const form = document.querySelector('.form');
const inputType = document.querySelector('.form__input--type');
const inputNom = document.querySelector('.form__input--nom');
const inputAdresse = document.querySelector('.form__input--adresse');
const inputService = document.querySelector('.form__input--service');
const inputHoraire = document.querySelector('.form__input--horaire');
const container = document.querySelector('.container');
const searchInput = document.getElementById('recherche');
const sidebar = document.querySelector('.sidebar');
const toggleMenu = document.querySelector('.toggleMenu');
const menu = document.querySelector('.menu');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const searchBtn = document.querySelector('.form__btn');

class App {
  #map;
  #mapEvent;
  #mapZoomLevel = 18;
  #locations = [];

  constructor() {
    this._getPosition();
    this._getLocalStorage();

    form.addEventListener('submit', this._newAgenceXpress.bind(this));
    container.addEventListener('click', this._moveToPopUp.bind(this));
    toggleMenu.addEventListener('click', this._toggleMenu.bind(this));
    exportBtn.addEventListener('click', this._exportData.bind(this));
    importBtn.addEventListener('change', this._importData.bind(this));
    searchInput.addEventListener('input', this._filterLocations.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () =>
        this._showModalLocation(
          'Impossible de récupérer votre position actuelle. Veuillez vérifier votre connexion ou réactualiser la page.'
        )
      );
    } else {
      this._showModalLocation(
        "La géolocalisation n'est pas supportée par votre navigateur."
      );
    }
  }

  _showModalLocation(message) {
    const modal = document.querySelector('.modal');
    modal.classList.remove('hidden');
    modal.querySelector('.modal__message').textContent = message;
    setTimeout(() => modal.classList.add('hidden'), 5000);
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
    this.#locations.forEach(location => this._renderBanqueMarker(location));
  }

  _showForm(e) {
    this.#mapEvent = e;
    form.classList.remove('hidden');
    inputNom.focus();
  }

  _hideForm() {
    form.classList.add('hidden');
    form.reset();
    setTimeout(() => {
      form.style.display = 'grid';
    }, 500);
  }

  _newAgenceXpress(e) {
    e.preventDefault();

    const { lat, lng } = this.#mapEvent.latlng;
    const type = inputType.value;
    const nom = inputNom.value;
    const adresse = inputAdresse.value;
    const horaire = inputHoraire.value;
    const services = inputService.value;

    if (!type || !nom || !adresse || !horaire || !services) {
      return this._showModal('Veuillez remplir tous les champs du formulaire.');
    }

    const isDuplicate = this.#locations.some(
      loc => loc.nom === nom && loc.adresse === adresse
    );
    if (isDuplicate) {
      return this._showModal(
        'Cette agence ou point Xpress existe déjà. Veuillez vérifier les informations saisies.'
      );
    }

    const location =
      type === 'agence'
        ? new Agence([lat, lng], nom, adresse, horaire, services)
        : type === 'xpress'
        ? new Xpress([lat, lng], nom, adresse, horaire, services)
        : null;

    if (!location) {
      return this._showModal("Type d'agence ou point Xpress non reconnu.");
    }

    this.#locations.push(location);
    this._renderBanqueMarker(location);
    this._renderBanque(location);
    this._hideForm();
    this._setLocalStorage();
  }

  _renderBanqueMarker(location) {
    const iconElement = L.divIcon({
      html: `<ion-icon name="${
        location.type === 'agence' ? 'business' : 'logo-xing'
      }" class="${
        location.type === 'agence' ? 'icon-agence' : 'icon-xpress'
      }"></ion-icon>`,
      className: 'custom-icon',
      iconSize: [30, 30],
    });

    const marker = L.marker(location.coords, { icon: iconElement }).addTo(
      this.#map
    );
    marker
      .bindTooltip(location.nom, {
        permanent: true,
        direction: 'left',
        className:
          location.type === 'agence'
            ? 'marker-agence marker'
            : 'marker-xpress marker',
        offset: L.point(-20, 0),
      })
      .openTooltip();

    const popup = L.popup({
      minWidth: 250,
      maxWidth: 300,
      autoClose: false,
      closeOnClick: false,
      className: 'popup',
    }).setContent(`
      <div class="${
        location.type === 'agence'
          ? 'popup-content-agence'
          : 'popup-content-xpress'
      }">
        <strong>${location.nom}</strong><br>
        Adresse : ${location.adresse}<br>
        Services : ${location.services}<br>
        Horaires : ${location.horaire}
      </div>
    `);

    marker.on('mouseover', () => marker.bindPopup(popup).openPopup());
    marker.on('mouseout', () => marker.closePopup());
  }

  _renderBanque(location) {
    const html = `
      <div class="location-container">
        <li class="location location--${location.type}" data-id="${
      location.id
    }">
          <h2 class="location__title">${location.nom}</h2>
          <div class="location__details-container">
            <div class="location__details">
              <span class="location__icon"><ion-icon name="${
                location.type === 'agence' ? 'business' : 'logo-xing'
              }"></ion-icon></span>
              <span class="location__value">${location.type}</span>
            </div>
            <div class="location__details">
              <span class="location__icon"><ion-icon name="location"></ion-icon></span>
              <span class="location__value">${location.adresse}</span>
            </div>
            <div class="location__details">
              <span class="location__icon"><ion-icon name="time"></ion-icon></span>
              <span class="location__value">${location.horaire}</span>
            </div>
            <div class="location__details">
              <span class="location__icon"><ion-icon name="card"></ion-icon></span>
              <span class="location__value">${location.services}</span>
            </div>
          </div>
        </li>
        <div class="location__actions">
          <button class="btn btn--edit"><ion-icon name="pencil"></ion-icon></button>
          <button class="btn btn--delete"><ion-icon name="trash"></ion-icon></button>
        </div>
      </div>
    `;
    document.querySelector('ul').insertAdjacentHTML('beforeend', html);
  }

  _moveToPopUp(e) {
    const locationEl = e.target.closest('.location');
    if (!locationEl) return;

    const location = this.#locations.find(
      loc => loc.id === +locationEl.dataset.id
    );
    this.#map.setView(location.coords, this.#mapZoomLevel, {
      animate: true,
      duration: 1,
    });
  }

  _toggleMenu() {
    menu.classList.toggle('hidden');
    document
      .getElementById('menu-icon')
      .setAttribute(
        'name',
        menu.classList.contains('hidden') ? 'grid' : 'close'
      );
  }

  _setLocalStorage() {
    localStorage.setItem('locations', JSON.stringify(this.#locations));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('locations'));
    if (!data) return;

    this.#locations = data;
    this.#locations.forEach(location => this._renderBanque(location));
  }

  reset() {
    localStorage.removeItem('locations');
    location.reload();
  }

  _showModal(message) {
    const modal = document.querySelector('.modal');
    modal.classList.remove('hidden');
    modal.querySelector('.modal__message').textContent = message;
    setTimeout(() => modal.classList.add('hidden'), 5000);
  }

  _exportData() {
    const data = JSON.stringify(this.#locations);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'banques.json';
    a.click();
  }

  _importData(e) {
    const input = e.target;
    const reader = new FileReader();
    reader.onload = () => {
      const data = JSON.parse(reader.result);
      data.forEach(location => {
        const newLocation =
          location.type === 'agence'
            ? new Agence(
                location.coords,
                location.nom,
                location.adresse,
                location.horaire,
                location.services
              )
            : location.type === 'xpress'
            ? new Xpress(
                location.coords,
                location.nom,
                location.adresse,
                location.horaire,
                location.services
              )
            : null;
        this.#locations.push(newLocation);
        this._renderBanqueMarker(newLocation);
        this._renderBanque(newLocation);
      });
      this._setLocalStorage();
    };
    reader.readAsText(input.files[0]);
  }

  _filterLocations() {
    const query = searchInput.value.toLowerCase();
    const locationContainers = document.querySelectorAll('.location-container');

    locationContainers.forEach(locationContainer => {
      const location = locationContainer.querySelector('.location');
      const titleElement = location.querySelector('.location__title');
      const locationType = location.classList.contains('location--agence')
        ? 'agence'
        : 'xpress';

      const matchesName = titleElement.textContent
        .toLowerCase()
        .includes(query);
      const matchesType =
        (query.includes('agence') && locationType === 'agence') ||
        (query.includes('xpress') && locationType === 'xpress') ||
        (!query.includes('agence') && !query.includes('xpress'));

      if (matchesName && matchesType) {
        locationContainer.style.display = 'flex';
      } else {
        locationContainer.style.display = 'none';
      }
    });
  }
}

class Banque {
  id = Date.now() + Math.floor(Math.random() * 1000);

  constructor(coords, nom, adresse, horaire, services) {
    this.coords = coords;
    this.nom = nom;
    this.adresse = adresse;
    this.horaire = horaire;
    this.services = services;
    this._setDescription();
  }

  _setDescription() {
    this.description = `${this.nom} - ${this.adresse}`;
  }
}

class Agence extends Banque {
  type = 'agence';
}

class Xpress extends Banque {
  type = 'xpress';
}

const app = new App();

searchBtn.addEventListener('click', function () {
  searchInput.focus();
  app._filterLocations();
});
