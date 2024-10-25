Voici le contenu du README en format Markdown pour votre projet **Novacoach** :

```markdown
# Novacoach - Guide d'Installation et de Configuration

## Introduction

Bienvenue dans le projet **Novacoach**. Ce projet utilise **Turborepo** pour la gestion du monorepo. Ce guide vous aidera à installer et configurer le projet sur votre machine locale.

## Prérequis

Avant de commencer, assurez-vous d'avoir les prérequis suivants installés sur votre machine :

1. **PostgreSQL**
2. **pnpm** (Gestionnaire de paquets)
3. **Turbo** (Turborepo CLI)

### Installation des Prérequis

1. **PostgreSQL** :
   - Suivez les instructions sur le site officiel pour installer PostgreSQL : [PostgreSQL Downloads](https://www.postgresql.org/download/)

2. **pnpm** :
   - Si vous n'avez pas pnpm installé, vous pouvez l'installer via npm :
     ```sh
     npm install -g pnpm
     ```

3. **Turbo** :
   - Installez Turbo CLI globalement :
     ```sh
     npm install -g turbo
     ```

## Installation des Dépendances

Une fois les prérequis installés, suivez ces étapes pour installer les dépendances du projet.

1. Clonez le dépôt du projet :
   ```sh
   git clone git@rendu-git.etna-alternance.net:module-9681/activity-52182/group-1038060
   ```

2. Accédez au répertoire du projet :

   ```sh
   cd novacoach
   ```

3. Installez les dépendances avec pnpm :

   ```sh
   pnpm install
   ```

## Configuration du Projet

1. Créez un fichier `.env` à la racine du projet et ajoutez-y les variables d'environnement nécessaires. Vous pouvez vous baser sur le fichier `.env.example` si présent :

   ```sh
   cp .env.example .env
   ```

2. Mettez à jour les informations de connexion à votre base de données PostgreSQL dans le fichier `.env`.

3. Remplir la base de données :

```sh
 pnpm run seed
```
(depuis la racine ou le dossier API)

4. Vider la base de données :

```sh
 cd apps/api
 pnpm run clear
```

## Lancer le Projet

Une fois que vous avez installé les dépendances et configuré les variables d'environnement, vous pouvez lancer le projet avec Turbo.

1. Pour démarrer le projet, exécutez la commande suivante :

   ```sh
   turbo dev
   ```

Cela démarrera tous les services nécessaires pour que le projet fonctionne.

## Informations Supplémentaires

- Au moment du seed, des utilisateurs et des coachs sont créés. Vous pouvez vous connecter avec les identifiants suivants :
  - **Utilisateur** : email : `eleve@gmaiL.com`, mot de passe : `password`
  - **Coach** : email : `coach@gmail.com`, mot de passe : `password`
  - **Admin** : email : `admin@gmail.com`, mot de passe : `password`

## Conclusion

Vous avez maintenant installé et configuré avec succès le projet **Novacoach**. Pour toute question ou problème, n'hésitez pas à consulter la documentation ou à contacter l'équipe de développement.

Merci de contribuer à Novacoach et bonne chance avec votre développement !

---

Si vous avez des suggestions pour améliorer ce guide, n'hésitez pas à soumettre une pull request.

```

Vous pouvez copier ce contenu et le coller dans un fichier nommé `README.md` à la racine de votre projet. Cela fournira aux développeurs une vue claire et concise des étapes nécessaires pour installer et configurer le projet **Novacoach**.
