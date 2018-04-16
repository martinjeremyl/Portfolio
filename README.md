# Traveled

https://travel-11111.firebaseapp.com

Une PWA utilisant [Parcel](https://parceljs.org/getting_started.html) pour bundler le code source.
Nécessite à minima Node 8.x et [Yarn](https://yarnpkg.com/en/docs)

## Lancer le projet

* `yarn install`
* `yarn dev`
* Se rendre à l'adresse [http://localhost:1234](http://localhost:1234)

## Structure des sources

* Dossier `api` : interactions avec Firebase
* Dossier `components` : composants réutilisables
* Dossier `config` : config relative a l'application, à certains modules...
* Dossier `pages` : contient les différentes pages de l'application
* Dossier `stores` : store Mobx servant à définir l'état global de l'application

## Convention de nommage

Le code est en anglais les commentaires sont en français

* Dossier `api` : ModuleApi
* Dossier `components` : pas de suffixe, nom du ficher & nom du composant commmencent par une majuscule
* Dossier `config` : pas de suffixe, nom du ficher commmence par une minuscule
* Dossier `pages` : UnePageDeLApplicationPage
* Dossier `stores` : UnStoreUtilisateurStore

## Modification de la configuration

* Babel : au besoin, il est possible de mettre a jour la configuration de babel en installant le plugin, preset... puis en mettant à jour le fichier `.babelrc`

* ESLint : Pour ajouter/supprimer des règles de lint il faut mettre a jour la clé `rules` du fichier `.eslintrc.json`. Il existe aussi des plugins pour ESLint
