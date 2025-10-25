FROM node:18.16

# Répertoire de travail
WORKDIR /usr/src/fabulousfx

# Copie et installation des dépendances
COPY package*.json ./
RUN npm ci --only=production

CMD mkdir -p sounds

# Copie du code source
COPY . .

# Lancement du bot
CMD ["npm", "run", "start"]