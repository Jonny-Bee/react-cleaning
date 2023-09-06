# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app (you can adjust this depending on your project)
RUN npm run build

# Expose a port for the application (usually React apps run on port 3000)
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]
