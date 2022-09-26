FROM node:18.9-alpine3.15

MAINTAINER "Justina <chiahuei.lin@gmail.com>"

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Bundle app source
COPY dist/ .

EXPOSE 8080

RUN npm i
CMD [ "npm", "start" ]