# Ecobank Cartographie

## Table des Matières

- [Introduction](#introduction)
- [Contexte](#contexte)
- [Fonctionnalités Clés](#fonctionnalités-clés)
- [Architecture de l'Application](#architecture-de-lapplication)
- [Flowchart](#flowchart)
- [Technologies Utilisées](#technologies-utilisées)
- [Composants Principaux](#composants-principaux)
- [Scénarios Utilisateurs](#scénarios-utilisateurs)
- [Sécurité et Vie Privée](#sécurité-et-vie-privée)
- [Plan de Test](#plan-de-test)
- [Déploiement](#déploiement)
- [Ressources Additionnelles](#ressources-additionnelles)

## Introduction

**Nom du projet** : Ecobank Cartographie

**Description** : Cette application de cartographie interactive aide les clients d'Ecobank à localiser les agences et points Xpress les plus proches, en utilisant la géolocalisation et une recherche avancée pour un accès rapide aux informations des points de service.

**Objectifs** :

- **Accessibilité** : Simplifier l'accès aux agences et points Xpress.
- **Expérience Utilisateur** : Fournir une navigation intuitive et rapide.
- **Développement des Services** : Encourager l'utilisation des services bancaires numériques d'Ecobank.

## Contexte

**Problème** : Les clients ont des difficultés à localiser rapidement les agences et points Xpress proches.

**Solution** : Une carte interactive intégrant la géolocalisation, le filtrage et l'affichage de données détaillées sur chaque point de service.

## Fonctionnalités Clés

- **Géolocalisation** : Localisation automatique de l'utilisateur pour afficher les points de service proches.
- **Recherche Avancée** : Filtrage par nom et type d'établissement (agence ou Xpress).
- **Informations Détaillées** : Affichage d'informations complètes sur chaque point de service, incluant nom, adresse, services et horaires.
- **Exportation et Importation** : Export et import des données des points en format JSON pour sauvegarder ou restaurer.

## Architecture de l'Application

L'application utilise une architecture frontale légère avec les composants suivants :

- **HTML, CSS et JavaScript** : Pour structurer l'interface utilisateur, gérer les interactions, et afficher les données.
- **Leaflet.js** : Bibliothèque de cartographie pour afficher les points de service et gérer le zoom, le déplacement, etc.
- **Local Storage** : Stocke localement les informations des points de service, permettant une récupération rapide.

Voici un aperçu de l'architecture de l'application :

![Architecture du Projet](Projet%20Ecobank%20Architecture.png)

## Flowchart

Ce flowchart montre le fonctionnement de l'application, notamment la récupération des données des agences à partir d'une API si elles ne sont pas déjà présentes dans le Local Storage.

![Flowchart du Projet](Projet%20Ecobank%20FlowChart_simple.png)

## Technologies Utilisées

- **Frontend** : HTML, CSS, JavaScript
- **Leaflet.js** : Pour la gestion de la carte interactive
- **IonIcons** : Pour les icônes de localisation
- **Local Storage** : Pour stocker les données de localisation

## Composants Principaux

- **App** :

  - Initialise la carte et gère les événements de clic, zoom et recherche.
  - Stocke et récupère les données des points de service.
  - Permet l'ajout, la modification et la suppression des points de service.

- **Classes 'Banque', 'Agence', 'Xpress'** :

  - Définit les différents types de points de service avec leurs attributs (coordonnées, nom, adresse, services, etc.).

- **Fonctions Importantes** :
  - `_getPosition()` : Obtient la position actuelle de l'utilisateur.
  - `_showForm()` et `_newAgenceXpress()` : Affiche le formulaire et ajoute un nouveau point.
  - `_renderBanqueMarker()` et `_renderBanque()` : Affiche les points sur la carte et dans la liste.
  - `_setLocalStorage()` et `_getLocalStorage()` : Gère le stockage et la récupération des points.
  - `_exportData()` et `_importData()` : Exporte et importe les données JSON des points.
  - `_filterLocations()` : Filtre les points affichés par nom ou type.

## Scénarios Utilisateurs

- **Localiser une agence** : L'utilisateur recherche une agence ou un point Xpress sur la carte par nom ou type.
- **Afficher les détails d'un point** : En cliquant ou survolant un marqueur, les informations du point s'affichent.
- **Exporter/Importer les données** : L'utilisateur peut sauvegarder ou restaurer les données via un fichier JSON.

## Sécurité et Vie Privée

- **Géolocalisation** : L'application demande l'autorisation de l'utilisateur avant d'accéder à sa position.
- **Stockage Local** : Les données sont stockées en Local Storage pour limiter les risques de fuite de données.

## Plan de Test

- **Tests Unitaires** : Validation des fonctionnalités de recherche, de géolocalisation et des composants principaux.
- **Tests d'Intégration** : Vérification de l'interaction entre Leaflet.js, Local Storage et l'affichage des données.
- **Tests UI** : Contrôle de l'affichage sur divers appareils et de la réactivité des éléments de l'interface.

## Déploiement

L'application est déployée et accessible à l'adresse suivante :  
**URL de Production** : [https://mapecobank.netlify.app/](https://mapecobank.netlify.app/)

## Ressources Additionnelles

- [Lien de Déploiement](Lien_deploiement.txt)
- **Présentation** : [Projet-Ecobank-Cartographie.pptx](Projet-Ecobank-Cartographie.pptx)
- **Flowcharts** :
  - [Flowchart Simple](Projet%20Ecobank%20FlowChart_simple.png)
  - [Flowchart Détaille](Projet%20Ecobank%20Flowchart_detaille.png)
- **Spécification Technique** : [Spec_Technique_Ecobank_Cartographie.md](Spec_Technique_Ecobank_Cartographie.md)

---
