# base image
FROM node:latest

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

# start app
CMD ["npm", "start"]