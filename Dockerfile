FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
COPY package*.json ./
RUN npm install
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
COPY . .
RUN chmod +x ./scripts/init-prisma.sh
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["sh","-c","./scripts/init-prisma.sh && npm run start"]
