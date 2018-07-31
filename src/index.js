import fs from 'fs';
import path from 'path';
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

(() => {
  const gcpKey = Buffer.from(process.env.GCP_KEY, 'base64').toString('ascii');
  const keyfilename = path.join(__dirname, 'gcp-key.json');
  fs.writeFileSync(keyfilename, gcpKey);
  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyfilename;
  client.login(discordToken);
})();
