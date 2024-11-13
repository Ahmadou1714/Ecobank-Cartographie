# Spécification Technique du Projet Ecobank Cartographie

## 1. Introduction

**Nom du projet** : Ecobank Cartographie

**Description** : Une application de cartographie interactive permettant aux clients d'Ecobank de localiser les agences et points Xpress les plus proches grâce à la géolocalisation, la recherche avancée et des informations complètes sur chaque point de service.

**Objectifs** :

- **Accessibilité** : Faciliter l'accès aux agences et points Xpress.
- **Expérience utilisateur** : Offrir une navigation intuitive et rapide.
- **Développement des services** : Encourager l'utilisation des services bancaires numériques.

## 2. Contexte

**Problème** : Les clients rencontrent des difficultés pour localiser rapidement les agences et points Xpress.

**Solution** : Une carte interactive, avec géolocalisation et filtrage, affichant des informations précises sur chaque point de service.

## 3. Fonctionnalités Clés

- **Géolocalisation** : Localisation automatique de l'utilisateur pour faciliter l'accès aux points proches.
- **Recherche avancée** : Filtrage par nom et type d'établissement (agence ou Xpress).
- **Informations détaillées** : Affichage des informations complètes (nom, adresse, services, horaires).
- **Exportation et Importation** : Export des données en JSON pour sauvegarde, import pour restaurer les données.

## 4. Technologies Utilisées

- **Frontend** : HTML, CSS, JavaScript pour la structure et l'interactivité.
- **Leaflet.js** : Pour gérer la carte interactive, le zoom, et le déplacement.
- **IonIcons** : Pour les icônes de localisation.
- **Local Storage** : Pour stocker les informations de localisation localement.

## 5. Architecture de l'Application

- **Interface utilisateur** : HTML, CSS et JavaScript pour l'affichage de la carte, formulaire de recherche, et gestion des interactions.
- **Local Storage** : Stockage et récupération de la liste des points de service pour un accès rapide.
- **Cartographie dynamique** : Utilisation de Leaflet.js pour afficher les marqueurs sur la carte et gérer les événements.

## 6. Composants Principaux

- **App** :
  - Initialisation de la carte et gestion des événements de clic, zoom, et recherche.
  - Stockage et récupération des données via Local Storage.
  - Gestion de la création, modification et suppression des points.
- **Classes 'Banque', 'Agence', 'Xpress'** :
  - Définit les types de localisations avec leurs attributs (coordonnées, nom, adresse, horaires, services).
- **Fonctions** :
  - `_getPosition()` : Récupère la position actuelle de l'utilisateur.
  - `_showForm()` et `_newAgenceXpress()` : Affiche le formulaire et ajoute un point de service.
  - `_renderBanqueMarker()` et `_renderBanque()` : Affiche les points sur la carte et dans la liste.
  - `_setLocalStorage()` et `_getLocalStorage()` : Gère le stockage des points.
  - `_exportData()` et `_importData()` : Gère l'import/export des données JSON.
  - `_filterLocations()` : Filtre les points affichés selon le nom ou le type.

## 7. Scénarios Utilisateurs

- **Localiser une agence** : L'utilisateur accède à la carte, recherche une agence par nom ou type.
- **Accéder aux informations détaillées** : En survolant un marqueur, une fenêtre contextuelle affiche les informations.
- **Exporter/Importer des données** : L'utilisateur peut sauvegarder ou charger les données via un fichier JSON.

## 8. Sécurité et Vie Privée

- **Géolocalisation** : Demande d'autorisation de l'utilisateur pour accéder à la position.
- **Stockage local** : Utilisation de Local Storage pour réduire le risque de fuite de données.

## 9. Plan de Test

- **Tests unitaires** : Validation de la recherche, de la géolocalisation, et des composants.
- **Tests d'intégration** : Validation de l'intégration avec Leaflet.js et Local Storage.
- **Tests UI** : Vérification de la disposition et de l'affichage sur divers appareils.

## 10. Déploiement

- **URL de production** : [https://mapecobank.netlify.app/](https://mapecobank.netlify.app/)
