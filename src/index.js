import Discord from 'discord.js';

import processMessage from './processMessage';

const client = new Discord.Client();

const discordToken = process.env.DISCORD_TOKEN;

if (!discordToken) {
  console.error('Must provide DISCORD_TOKEN environment variable!');
  process.exit(1);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', processMessage);

client.login(discordToken);
