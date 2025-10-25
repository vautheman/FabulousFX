FROM node:18.16

# Répertoire de travail
RUN mkdir /usr/src/fabulousfx
WORKDIR /usr/src/fabulousfx

# Copie et installation des dépendances
COPY package*.json /usr/src/fabulousfx
RUN npm install
COPY . /usr/src/fabulousfx

# Copie du code source
COPY . .

# Lancement du bot
CMD ["npm", "run", "start"]

HEALTHCHECK NONE