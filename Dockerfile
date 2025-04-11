FROM node:20-alpine

WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el código fuente del proyecto
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Preparar los archivos estáticos y públicos
RUN mkdir -p .next/standalone/.next/static
RUN cp -r .next/static .next/standalone/.next/
RUN cp -r public .next/standalone/

# Exponer el puerto (ajústalo según tu configuración)
EXPOSE 80

# Comando para ejecutar la aplicación
CMD ["node", ".next/standalone/server.js"]