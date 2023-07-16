# FROM node:alpine
# WORKDIR /app
# COPY package.json ./
# COPY package-lock.json ./
# COPY ./ ./
# RUN npm i
# CMD ["npm", "run", "start"]


FROM node:latest

# Create a directory where our app will be placed
RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json /app/

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY src /app/src/
COPY public /app/public/
#COPY env.sh /app/

#COPY build env.js env.js.sh ./
RUN pwd
RUN ls
#RUN chmod +x env.sh
# Expose the port the app runs in
EXPOSE 3000
CMD  npm start