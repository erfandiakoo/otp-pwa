# Use the official Node.js image as the base image
FROM node:21-alpine as build

# Set the working directory inside the container
WORKDIR .

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm install --force

# Copy the entire project directory to the container
COPY . .

# Start Node server
CMD [ "npm","run","dev" ]

# Expose port 80 for the server
EXPOSE 80