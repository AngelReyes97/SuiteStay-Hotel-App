# Stage 1: Build the Angular application
FROM node:latest AS node

# Set the working directory for the application
WORKDIR /app

# Copy the package.json and package-lock.json files to install dependencies
COPY package.json package-lock.json ./

# Install the necessary npm dependencies
RUN npm install

# Copy the rest of the source code into the container
COPY . .

# Build the Angular application for production
RUN npm run build --prod

### Stage 2: Set up Nginx to serve the Angular application
FROM nginx:alpine

# Copy the built Angular application from the previous stage to Nginx's default web directory
COPY --from=node /app/dist/suite-stay/browser /usr/share/nginx/html

# Copy the custom Nginx configuration to the container
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf