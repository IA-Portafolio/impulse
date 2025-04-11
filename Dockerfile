FROM node:20-alpine AS builder
WORKDIR /app
# Instalar dependencias
COPY package*.json ./
RUN npm install
# Copiar código fuente y construir
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
# Copiar solo los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# Configuración del entorno
EXPOSE 80
ENV PORT=80
ENV NODE_ENV=production
# Ejecutar la aplicación
CMD ["node", "server.js"]