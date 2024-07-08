# NODE 20 from alipe ubuntu
FROM node:20.13.1

# Working directory
WORKDIR /app

# Copy package.json and lock file to
COPY package*.json ./

# Install dependencies
RUN npm install --only=production


# Copy the build folder
COPY build/ ./build

# COPY prod env file to env
COPY .env.prod .env

# Expose port
EXPOSE 8080

# serve the project
CMD [ "npm", "run", "start" ]
