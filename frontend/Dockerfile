# Dockerfile for frontend React
FROM --platform=linux/amd64 node:18

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Supprimer les dépendances anciennes s'il y en a
RUN rm -rf node_modules

# Installer les dépendances
RUN npm install --legacy-peer-deps

COPY . .

# Lancer le serveur React
CMD ["npm", "run", "dev"]
