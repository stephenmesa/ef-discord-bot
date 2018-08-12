import fs from 'fs';
import path from 'path';
import Discord from 'discord.js';
import _ from 'lodash';

var Bot = {};

const client = new Discord.Client();
const cooldowns = new Discord.Collection();

const discordToken = process.env.DISCORD_TOKEN;

Bot.Discord = Discord;
Bot.replyDelete = function(message, reply, deleteCommand = false)
{
	return message.reply(reply)
	.then(msg => {
		msg.delete(6000);
		if(deleteCommand) message.delete();
	});
};
Bot.FindUser = function(user, message)
{
	const mention = message.mentions.users.first();
	if(mention) return mention;
	else {
		return message.guild.members.find(member => member.displayName.toLowerCase() === user.trim().toLowerCase());
	}
};
Bot.sendMessage = function(user, message)
{
	client.fetchUser(user).send(message);
};

if (!discordToken) {
  console.error('Must provide DISCORD_TOKEN environment variable!');
  process.exit(1);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  if (!message.content.startsWith(config.discord.prefix) || message.author.bot) return;

	const args = message.content.slice(config.discord.prefix.length).trim().split(/ +/g);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}
	if(message.author.id !== config.discord.owner && ((command.role && !message.member.roles.has(command.role)) || command.permission && !message.member.hasPermission(command.permission)) )
	{
		return message.reply('You do not have access to this command!');
	}
	if (command.args && args.length < command.args) {
		let reply = `You didn't provide enough arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${config.discord.prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
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
	}
	else {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}
	try {
		command.execute(message, args);
	}
	catch (error) {
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
	Bot: Bot
};

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const commands = require(`./commands/${file}`).commands;
	_.each(commands, function(command)
	{
		client.commands.set(command.name, command);
	});
}
