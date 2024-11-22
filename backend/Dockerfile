# Usa una imagen de Node.js como base
FROM node:16-alpine

# Instalar herramientas necesarias para compilar bcrypt y otras dependencias nativas
RUN apk add --no-cache make gcc g++ python3

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Exponer el puerto donde la aplicación estará escuchando
EXPOSE 3000

# Comando por defecto para iniciar la aplicación
CMD ["npm", "start"]
