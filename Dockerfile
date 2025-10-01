# --- Etapa 1: Builder ---
# Usamos una imagen completa de Node 22 para compilar la aplicación.
# La nombramos "builder" para poder referenciarla luego.
FROM node:22-alpine AS builder

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos solo los archivos de manifiesto de paquetes (package.json y package-lock.json)
COPY package*.json ./

# Instalamos las dependencias. Usamos 'npm install' que es más flexible que 'npm ci'.
RUN npm install

# Copiamos el resto del código fuente de la aplicación
COPY . .

# Compilamos la aplicación para producción
RUN npm run build

# --- Etapa 2: Runner ---
# Usamos una imagen ligera de Node para la ejecución
FROM node:22-alpine

WORKDIR /app

# Copiamos solo los archivos necesarios de la etapa "builder"
# Nota: Copiamos todo el node_modules, npm no separa fácilmente dev vs prod en este flujo.
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Establecemos el puerto que la aplicación usará
# Debe coincidir con el puerto en tu astro.config.mjs
EXPOSE 5000

# Variable de entorno para que el servidor escuche en todas las interfaces de red
ENV HOST=0.0.0.0
# Dokploy sobreescribirá esta variable si la configuras en su UI, pero es bueno tener un default.
ENV PORT=5000

# El comando que ejecutará Dokploy para iniciar tu aplicación
CMD ["node", "dist/server/entry.mjs"]

