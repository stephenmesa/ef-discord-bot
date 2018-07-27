FROM node:8.4.0-alpine
MAINTAINER Stephen Mesa stephen.mesa@gmail.com
RUN mkdir -p /usr/src/ef-discord-bot
WORKDIR /usr/src/ef-discord-bot
ADD . /usr/src/ef-discord-bot
RUN npm install --n
RUN npm rebuild
CMD ["npm", "start"]
