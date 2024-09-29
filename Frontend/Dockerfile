# Use the official Node.js image as the base image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Expo CLI and @expo/ngrok globally
RUN npm install -g expo-cli @expo/ngrok

# Copy the rest of the application code
COPY . .

# Copy the .env file
COPY .env .env

# Set the Expo token as environment variable
ENV EXPO_TOKEN=T7BHRHgi0aS_cBiM4DZMGD9DO48BEscksS-5nr89

# Expose the port the app runs on
EXPOSE 8081

# Start the Expo packager
CMD ["npx", "expo", "start", "--tunnel"]