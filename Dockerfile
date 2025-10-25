FROM node:18.16

# Répertoire de travail
RUN mkdir /usr/src/fabulousfx
WORKDIR /usr/src/fabulousfx

# Copie et installation des dépendances
COPY package*.json ./
RUN npm cache clean --force \
 && npm install --legacy-peer-deps --no-audit --no-fund

COPY . /usr/src/fabulousfx

# Copie du code source
COPY . .

# Lancement du bot
CMD ["npm", "run", "start"]

HEALTHCHECK NONE