FROM node:18.16

# Répertoire de travail
RUN mkdir /usr/src/fabulousfx
WORKDIR /usr/src/fabulousfx

RUN mkdir -p ./sounds

# Copie et installation des dépendances
COPY package*.json ./
RUN npm install

# Copie du code source
COPY . .

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "process.exit(0)"

# Lancement du bot
CMD ["npm", "run", "start"]