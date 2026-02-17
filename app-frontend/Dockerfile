# Use the official Node.js image with Yarn as the base image
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json if using npm
# COPY package*.json ./

# Install dependencies
COPY . .
RUN npm install

# Build your React application
# RUN npm run build

# Expose port 5173 to allow outside access to our application
EXPOSE 5173

# Serve the React application 
CMD npm run dev