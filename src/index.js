import fs from 'fs';
import path from 'path';
import Discord from 'discord.js';
import _ from 'lodash';

import commands from './commands';
import processMessage from './processMessage';

const client = new Discord.Client();

const discordToken = process.env.DISCORD_TOKEN;

if (!discordToken) {
  console.error('Must provide DISCORD_TOKEN environment variable!');
  process.exit(1);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const version = process.env.npm_package_version;
  // Either use the provided bot status override or default to Celestial
  const botStatus = process.env.BOT_STATUS || `Sponsored by Celestial (${version})`;
  client.user.setActivity(botStatus, { type: 'WATCHING' })
    .catch(console.error);
});

client.on('message', message => processMessage(message, client));

client.commands = new Discord.Collection();

_.each(commands, (command) => {
  client.commands.set(command.name, command);
});

(() => {
  const gcpKey = Buffer.from(process.env.GCP_KEY, 'base64').toString('ascii');
  const keyfilename = path.join(__dirname, 'gcp-key.json');
  fs.writeFileSync(keyfilename, gcpKey);
  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyfilename;
  client.login(discordToken);
})();
