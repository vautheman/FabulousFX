FROM node:18.16

# Répertoire de travail
RUN mkdir /usr/src/fabulousfx
WORKDIR /usr/src/fabulousfx

RUN mkdir ./sounds

# Copie et installation des dépendances
COPY package*.json ./
RUN npm install

COPY . /usr/src/fabulousfx

# Copie du code source
COPY . .

# Lancement du bot
CMD ["npm", "run", "start"]

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "process.exit(0)"