FROM node:10.19-jessie-slim

RUN apt-get update && apt-get install -y \
  imagemagick \
  librsvg2-dev \
  librsvg2-bin

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "start"]
