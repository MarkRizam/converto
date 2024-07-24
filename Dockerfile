# Use the official Node.js image to build the app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application and build
COPY . ./
RUN npm run build

# Use the official Nginx image to serve the app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port and define the entry point
EXPOSE 80
