import fs from 'fs';
import path from 'path';
import Discord from 'discord.js';
import _ from 'lodash';

const Bot = {
  prefix: '!',
  owner: '294466905073516554',
  Discord,
};

const client = new Discord.Client();
const cooldowns = new Discord.Collection();

const discordToken = process.env.DISCORD_TOKEN;

Bot.replyDelete = function replyDelete(message, reply, deleteCommand = false) {
  return message.reply(reply)
    .then((msg) => {
      msg.delete(6000);
      if (deleteCommand) message.delete();
    });
};
Bot.sendMessage = function sendMessage(user, message) {
  client.fetchUser(user).send(message);
};

if (!discordToken) {
  console.error('Must provide DISCORD_TOKEN environment variable!');
  process.exit(1);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
  if (!message.content.startsWith(Bot.prefix) || message.author.bot) return;

  const args = message.content.slice(Bot.prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.guildOnly && message.channel.type !== 'text') {
    message.reply('I can\'t execute that command inside DMs!');
    return;
  }
  if (message.author.id !== Bot.owner
    && (command.permission && !message.member.hasPermission(command.permission))) {
    message.reply('You do not have access to this command!');
    return;
  }
  if (command.args && args.length < command.args) {
    let reply = `You didn't provide enough arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${Bot.prefix}${command.name} ${command.usage}\``;
    }

    message.channel.send(reply);
    return;
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (!timestamps.has(message.author.id)) {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  } else {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
      return;
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }
  try {
    command.execute(message, args);
  } catch (error) {
    message.reply('there was an error trying to execute that command!');
  }
});

(() => {
  const gcpKey = Buffer.from(process.env.GCP_KEY, 'base64').toString('ascii');
  const keyfilename = path.join(__dirname, 'gcp-key.json');
  fs.writeFileSync(keyfilename, gcpKey);
  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyfilename;
  client.login(discordToken);
})();

Bot.client = client;
module.exports = {
  Bot,
};

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

_.each(commandFiles, (file) => {
  const [commands] = require(`./commands/${file}`).commands; // eslint-disable-line global-require, import/no-dynamic-require
  _.each(commands, (command) => {
    client.commands.set(command.name, command);
  });
});
