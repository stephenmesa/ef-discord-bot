FROM node:8.4.0-alpine
MAINTAINER Stephen Mesa stephen.mesa@gmail.com
RUN mkdir -p /usr/src/ef-discord-bots
WORKDIR /usr/src/ef-discord-bots
ADD . /usr/src/ef-discord-bots
RUN npm install --n
RUN npm rebuild
CMD ["npm", "start"]
