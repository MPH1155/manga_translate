# Use an official Node runtime as a parent image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the app (if required, e.g., for create-react-app)
RUN npm run build

# Expose the port (adjust according to your app)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
