Je vous propose de mettre en place un déploiement continu en utilisant [Condorcet](https://github.com/jean-smaug/condorcet), un de mes projets, comme exemple.
Le but est de présenter les différents concepts inhérents à CircleCI au travers d'un cas concret.
Dans la première partie on mettra en place une solution fonctionnelle que l'on optimisera en seconde partie.

# L'application

Cette application est faite avec [Vue.js](https://vuejs.org/) et utilise [Firebase](https://firebase.google.com/) pour la gestion utilisateurs et le stockage des données. Nous allons aussi utiliser Firebase pour héberger l'application.

Les scripts du package.json :

```json
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "test:unit": "vue-cli-service test:unit"
  }
```

- `serve` lance le serveur de développement
- `build` construit une application statique pour la production
- `lint` vérifie que le code respecte les règles définies par ESLint
- `test:unit` lance les tests unitaires

Parmi ces scripts j'aimerais que `build`, `lint` et `test:unit` soient lancés à chaque fois que je cherche à intégrer du code dans `master`. Car `master` doit toujours être stable :croissant:.

Pour éviter de le faire manuellement je vais utiliser [CircleCI](https://circleci.com/). Cet outil va lancer les scripts à chaque fois que je push un commit sur Github. 

# Ajouter CircleCI à son projet

Pour ajouter CircleCI à un dépôt il faut se rendre dans la Marketplace de Github :

![circle-ci-github1](https://thepracticaldev.s3.amazonaws.com/i/vuibgph281o3zyk5kg4c.png)

Pour un projet open source il faut sélectionner l'option "Free", à moins que vous ne souhaitiez sortir le chequos :

![circle-ci-github2](https://thepracticaldev.s3.amazonaws.com/i/idopy09l6hqs8i3e1n0q.png)

Après avoir validé l'installation de CircleCI on peut ajouter un projet Github à CricleCI :

![circle-ci-github3](https://thepracticaldev.s3.amazonaws.com/i/kf29upwnecfsfgr8p6wn.png)

Nous arrivons sur la page des projets :

![circle-ci-github4](https://thepracticaldev.s3.amazonaws.com/i/vp91njjd817wexwx166q.png)

Sur cette page il est possible de sélectionner l'environnement dans lequel nous allons effectuer nos tests :

![circle-ci-github5](https://thepracticaldev.s3.amazonaws.com/i/ov3z7i2ku0bwja0eyqnl.png)

Première étape validée, on passe à la configuration.

# Définition des jobs

Pour CircleCI un job représente une succession d'instructions.
Pour un projet open source nous pouvons avoir 4 jobs maximum s'exécutant en parallèle.
Concrètement, chacun des trois scripts aura un job qui lui sera dédié et nous pourrons ainsi lancer 3 jobs en parallèle, un pour chaque script. Ainsi chacun des scripts sera lancé dans un environnement isolé n'impactant pas les autres.

L'exemple ci dessous montre à quoi ressemble la définition d'un job :

```yml
  build:
    docker:
      - image: circleci/node:11.10.1
    steps:
      - checkout
      - run: yarn install
      - run: yarn build
```

- `build` : le nom du job
- `docker` : l'environnement dans lequel sera exécuté notre job, ici Docker
    - `image` : l'image que doit utiliser Docker, ici Node.js
- `steps` : liste de nos instructions
    - `checkout` permet de se placer dans le dossier projet créé par CircleCI
    - `run: yarn install` installe les dépendances
    - `run: yarn build` construit une application statique destinée à la production

NB : les commandes shell doivent être précédées d'un `run:`

On répète l'opération pour chacun des scripts et on obtient la configuration suivante pour les trois jobs :

```yml
version: 2.1
jobs:
  build:
    docker:
      - image: circleci/node:11.10.1
    steps:
      - checkout
      - run: yarn install
      - run: yarn build

  lint:
    docker:
      - image: circleci/node:11.10.1
    steps:
      - checkout
      - run: yarn install
      - run: yarn lint

  test:
    docker:
      - image: circleci/node:11.10.1
    steps:
      - checkout
      - run: yarn install
      - run: yarn test:unit

workflows:
  version: 2
  integration:
    jobs:
      - build
      - lint
      - test
```

- `version` : la version du fichier de configuration, actuellement 2.1
- `jobs` : la liste de nos différents jobs
- `workflows` : un scénario d'exécution des différents jobs
    - `version` : version du workflow, actuellement 2
    - `integration` : le nom du workflow
        - `jobs` : la liste des jobs à executer. Ici nos trois jobs seront exécutés en parallèle

Désormais lorsque l'on pushera du code sur Github on pourra voir l'état de nos tests sur CircleCI :

![circle-ci-integration](https://thepracticaldev.s3.amazonaws.com/i/zkn88tdbxnhjm5pewjtz.png)

Cela est aussi visible directement depuis une Pull Request sur Github :

![cricle-ci-pr](https://thepracticaldev.s3.amazonaws.com/i/5182d3gq4avt7dx1ck9e.png)

# Déploiement

Maintenant que l'intégration fonctionne il serait génial de déployer automatiquement notre code lorsqu'un nouveau commit apparait sur la branche `master`. Que ce soit via une pull request ou un push (force 🙄)

Je fais un petit aparté sur Firebase mais qui sait, peut-être que ça en intéressera certains :man_shrugging:

Pour déployer des fichiers statiques sur le service hosting de Firebase via une CI il faut :
- installer les outils Firbase en local avec un `yarn global add firebase-tools`. 
- lancer un `firebase login:ci` afin d'obtenir un token

Ce token sera utilisé pour autoriser la CI à déployer sur Firebase.

Pour ajouter un token il faut aller dans les paramètres :

![circle-ci-env-variables-2](https://thepracticaldev.s3.amazonaws.com/i/76v95hce6smpwnb2219s.png)

Et ajouter le token en tant que variable d'environnement, ici elle sera appelée `FIREBASE_TOKEN` :

![circle-ci-env-variables](https://thepracticaldev.s3.amazonaws.com/i/tu1krp4pn7bnrlae2yqr.png)

On pourra alors réutiliser la variable d'environnement dans notre fichier de configuration :

```yml
version: 2
jobs:
  # les autres jobs...

  deploy:
    docker:
      - image: circleci/node:11.10.1
    steps:
      - checkout
      - run: yarn install
      - run: yarn build
      - run: yarn firebase deploy --token "$FIREBASE_TOKEN" --only hosting

workflows:
  version: 2
  integration:
    jobs:
      - build
      - lint
      - test
    - deploy:
          requires:
            - build
            - lint
            - test
          filters:
            branches:
              only: master
```

Dans le nouveau job : `deploy`, on utilise la variable `$FIREBASE_TOKEN` que l'on vient de créer.
Ensuite il suffit d'ajouter ce job à notre workflow en lui ajoutant des options :
- `requires` : les jobs qui doivent être complétés avant d'exécuter ce job
- `filters` : permet de préciser pour quelles branches, quels tags... ce job doit s'exécuter. Dans notre cas, uniquement sur la branche `master`

![circle-ci-v1](https://thepracticaldev.s3.amazonaws.com/i/51jtjfpnwys57lyv3f7e.png)

# Résumé

Les jobs sont une suite d'instructions.
Un workflow définit la manière dont les différents jobs seront exécutés. On peut exécuter nos jobs en parallèle, en séquentiel, uniquement sur certaines branches...
On peut ajouter des variables d'environnements contenant des informations confidentielles via l'UI et utiliser ces variables dans notre configuration en les précédant d'un $

# Prochaine étape

Dans l'absolu notre configuration fonctionne, mais il est possible de faire mieux.
Dans [l'article suivant](https://dev.to/jeansmaug/dploiement-continu-avec-circleci---partie-2-6op) on va améliorer la configuration pour gagner un temps de malade. :sunglasses:

# Liens utiles
[Document de référence du fichier de configuration](https://circleci.com/docs/2.0/configuration-reference)
[Configuration finale](https://github.com/jean-smaug/condorcet/blob/4046a6723fc2c4b6470c79b309683d9f7af9844a/.circleci/config.yml)
