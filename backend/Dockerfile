# Use a lightweight Node image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the project
COPY . .

# Expose port the backend listens on
EXPOSE 5000

# Command to run the server
CMD ["node", "server.js"]
