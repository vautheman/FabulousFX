FROM node:18.16

# Répertoire de travail
WORKDIR /usr/src/fabulousfx

# Copie et installation des dépendances
COPY package*.json ./

# Copie du code source
COPY . .

# Lancement du bot
CMD ["npm", "run", "start"]

HEALTHCHECK NONE