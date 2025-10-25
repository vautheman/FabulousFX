FROM node:18.16

# Répertoire de travail
WORKDIR /usr/src/fabulousfx

# Copie et installation des dépendances
COPY package*.json ./

# Copie du code source
COPY . .

HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD node -e "process.exit(0)"

# Lancement du bot
CMD ["npm", "run", "start"]