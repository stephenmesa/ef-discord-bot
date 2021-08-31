FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python3 && \
  npm install --quiet node-gyp -g &&\
  npm install --quiet && \
  apk del native-deps

COPY . .

RUN npm run build

CMD ["npm", "start"]
