# Use the official Node.js image as a base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose the port the app runs on (adjust if your app uses a different port)
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
