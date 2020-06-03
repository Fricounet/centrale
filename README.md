# STWeb

## Installation du projet

### Prérequis

- [github](https://github.com) - **check :** je peux m'authentifier sur Github (je vois ma photo de profil et mon nom dans le header en haut à droite)
- [node 12](https://nodejs.org/en/download/) - **check :** `node --version` retourne une version au moins supérieure à la `v12.0.0`
- [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) - **check :** `aws --version` retourne une version au moins supérieure à la `aws-cli/2.0.0`, la version de Python précisée importe peu
- configurer les identifiants de connexion au compte AWS du cours :

    - Taper la commande `aws configure` et renseigner les informations suivantes pour chaque entrée demandée :

        - AWS Access Key ID : **voir sur Slack**
        - AWS Secret Access Key : **voir sur Slack**
        - Default region name : `eu-west-1`
        - Default output format : `json`

### Premier setup - A effectuer une fois PAR GROUPE

- Se rendre dans le terminal à la racine du dossier `backend` de ce projet
- Forker le repository https://github.com/AleBlondin/centrale

