FROM node:16-alpine

RUN apk add \
        imagemagick \
        librsvg

RUN apk --no-cache --virtual build-dependencies add \
        python3 \
        make \
        g++

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

RUN apk del build-dependencies

COPY . .

RUN npm run build

CMD ["npm", "start"]
