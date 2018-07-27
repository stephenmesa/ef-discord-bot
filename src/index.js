require('dotenv').config();
var Discord = require("discord.js");
var client = new Discord.Client();

var messaging = require('./messaging');

var discordToken = process.env.DISCORD_TOKEN;

if (!discordToken) {
  console.error('Must provide DISCORD_TOKEN environment variable!');
  process.exit(1);
}

client.on('ready', function() {
  console.log('Logged in as ' + client.user.tag + '!');
});

client.on('message', messaging.processMessage);

client.login(discordToken);
