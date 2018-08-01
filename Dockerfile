FROM node:8
MAINTAINER Stephen Mesa stephen.mesa@gmail.com
RUN mkdir -p /usr/src/ef-discord-bot
WORKDIR /usr/src/ef-discord-bot
ADD . /usr/src/ef-discord-bot
RUN apt-get update && apt-get install -y \
  imagemagick \
  librsvg2-dev \
  librsvg2-bin
RUN npm install --n
RUN npm rebuild
RUN npm run build
CMD ["npm", "start"]
