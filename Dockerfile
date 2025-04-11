FROM node:20-alpine AS builder
WORKDIR /app
# Instalar dependencias
COPY package*.json ./
RUN npm install
# Copiar código fuente
COPY . .
# Generar el cliente Prisma y luego construir
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
# Copiar solo los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# Copiar los archivos generados de Prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
# Configuración del entorno
EXPOSE 80
ENV PORT=80
ENV NODE_ENV=production
# Ejecutar la aplicación
CMD ["node", "server.js"]