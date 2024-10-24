'use strict';

const form = document.querySelector('.form');
const inputType = document.querySelector('#type');
const inputNom = document.querySelector('#nom');
const inputAdresse = document.querySelector('#adresse');
const inputServices = document.querySelector('#services');
const inputHoraire = document.querySelector('#horaire');

class App {
  #map;
  #mapEvent;
  #mapZoomlevel = 13;
  #locations = [];

  constructor() {
    this._getPosition();
    this._getLocalStorage();

    form.addEventListener('submit', this._newLocation.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
        alert('Could not get your current location!');
      });
    }
  }

  _loadMap(position) {
    const { longitude, latitude } = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomlevel);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker(coords).addTo(this.#map).bindPopup('Vous êtes ici').openPopup();

    this.#map.on('click', this._showForm.bind(this));

    this.#locations.forEach(location => {
      this._renderLocationMarker(location);
    });
  }

  _showForm(e) {
    this.#mapEvent = e;
    form.classList.remove('hidden');
    inputNom.focus();
  }

  _hideForm() {
    inputNom.value = inputAdresse.value = '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => {
      form.style.display = 'grid';
    }, 500);
  }

  _newLocation(e) {
    e.preventDefault();

    const { lat, lng } = this.#mapEvent.latlng;

    const type = inputType.value;
    const nom = inputNom.value;
    const adresse = inputAdresse.value;
    const services = inputServices.value;
    const horaire = inputHoraire.value;

    const location = {
      id: Date.now(),
      coords: [lat, lng],
      type,
      nom,
      adresse,
      services,
      horaire,
    };

    this.#locations.push(location);

    this._renderLocationMarker(location);

    this._hideForm();

    this._setLocalStorage();
  }

  _renderLocationMarker(location) {
    L.marker(location.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          minWidth: 250,
          maxWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${location.type}-popup`,
        })
      )
      .setPopupContent(`${location.type === 'agence' ? '🏢' : '🏪'} ${location.nom}`)
      .openPopup();
  }

  _setLocalStorage() {
    localStorage.setItem('locations', JSON.stringify(this.#locations));
  }

  _getLocalStorage() {
    const locations = JSON.parse(localStorage.getItem('locations'));

    if (!locations) return;

    this.#locations = locations;

    this.#locations.forEach(location => {
      this._renderLocationMarker(location);
    });
  }
}

const app = new App();
