FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3000

# Create Database
RUN npx prisma migrate dev --name init

# Add infos to the database
RUN npx ts-node .\prisma\addinfos.ts


# Start the application
CMD ["npm", "run", "start"] 