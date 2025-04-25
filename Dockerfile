FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Define build-time argument
ARG DATABASE_URL

# Set environment variable
ENV DATABASE_URL=${DATABASE_URL}

# Copy the rest of the application
COPY . .

# Ensure the script has execution permissions
RUN chmod +x ./scripts/init-prisma.sh

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application and run the Prisma script
CMD ["sh", "-c", "./scripts/init-prisma.sh && npm run start"]