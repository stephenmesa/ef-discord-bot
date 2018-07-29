require("babel-core").transform("code", {});

import Discord from 'discord.js';
const client = new Discord.Client();

import * as messaging from './messaging';

const discordToken = process.env.DISCORD_TOKEN;

if (!discordToken) {
  console.error('Must provide DISCORD_TOKEN environment variable!');
  process.exit(1);
}

client.on('ready', () => {
  console.log('Logged in as ' + client.user.tag + '!');
});

client.on('message', messaging.processMessage);

client.login(discordToken);
