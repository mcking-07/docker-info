FROM node:latest

WORKDIR /docker-info

RUN apt-get update && apt-get upgrade -y

COPY package.json /docker-info/package.json

RUN npm install

COPY . /docker-info

EXPOSE 8000

ENTRYPOINT node server.js