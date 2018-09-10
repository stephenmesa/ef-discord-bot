FROM buildkite/puppeteer

LABEL maintainer="stephen.mesa@gmail.com"

# It's a good idea to use dumb-init to help prevent zombie chrome processes.
ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

RUN mkdir -p /usr/src/ef-discord-bot
WORKDIR /usr/src/ef-discord-bot
ADD . /usr/src/ef-discord-bot
RUN npm install --n
RUN npm rebuild
RUN npm run build

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
