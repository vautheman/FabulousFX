
![Logo](https://raw.githubusercontent.com/vautheman/SynthBot/main/.images/fabulous-synthbot-bg.jpg)


# 🤖 Fabulous (Bot Discord - Musique & Soundboard)

Fabulous est un bot Discord construit avec JavaScipt, discord.js et utilise le Command Handler de discordjs.guide.


## Requis

1. Token Discord Bot **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**  
   1.1. Activer "Message Content Intent" dans le portail des développeurs Discord
2. Node.js 16.11.0 ou plus récent
## 🚀 Pour commencer

```sh
git clone https://github.com/vautheman/synthbot.git
cd synthbot
npm install
```

Une fois l'installation terminée, suivez les instructions de configuration puis lancez `npm run start` pour démarrer le bot.


## ⚙️ Configuration

Créer un fichier `.env` et remplissez les valeurs suivantes :

⚠️ **Note : Ne jamais engager ou partager publiquement votre token ou vos clés d'api** ⚠️

```json
  TOKEN:<Votre token>
  clientId:<Votre client id>
```


## 🐬 Docker Configuration

Pour ceux qui préfèrent utiliser un container Docker, copiez/collez le fichier `Dockerfile_exemple` et renommez le par `Dockerfile`. Modifiez ensuite les variables d'environnement par les votres.

```shell
FROM node:18.16
RUN mkdir /usr/src/fabulous
WORKDIR /usr/src/fabulous
COPY package*.json /usr/src/fabulous
RUN npm install
COPY . /usr/src/fabulous

ENV TOKEN=<Votre token>
ENV clientId=<Votre clientId>

CMD ["npm", "run", "start"]
```


## 📝 Fonctionnalités et commandes
### Musique

- ▶️ Jouer de la musique via une url Youtube

`/play https://www.youtube.com/watch?v=GLvohMXgcBo`

- 🔎 Jouer de la musique sur YouTube par le biais d'une recherche

`/play under the bridge red hot chili peppers`

- ⏯️ Mettre en pause et reprendre la musique 
`/pause`

- ⏹️ Stopper la musique 
`/stop`

- ⏯️ Voir le titre actuellement joué 
`/nowplaying`

- 🔊 Gérer le volume sonore
`/volume 50`


### Soundboard

- ❇️ Uploader un effet sonore (MP3 Uniquement)

`/add <Votre fichier>`

- 📜 Lister tout les effets sonores existant

`/list`

- ▶️ Jouer un effet sonore

`/sound fart`

