import Discord from 'discord.js';
import _ from 'lodash';

import { getRecentRecordCounts, getSponsors } from '../datastore';
import * as txt from '../txt';

const { BOT_PREFIX, DONATION_URL } = process.env;

const pingCommand = {
  name: 'ping',
  description: 'See the bots current ping',
  execute: (message) => {
    message.reply('Pong!');
  },
};

const helpCommand = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  aliases: ['commands'],
  usage: '[command name]',
  execute: (message, args) => {
    const { commands } = message.client;
    const data = [];
    if (!args.length) {
      data.push('Here\'s a list of all my commands:\n`');
      data.push(commands.map(command => command.name).join('`, `'));
      data.push(`\`\nYou can send \`${BOT_PREFIX}help [command name]\` to get info on a specific command!`);
    } else {
      if (!commands.has(args[0])) {
        message.reply('that\'s not a valid command!');
        return;
      }
      const command = commands.get(args[0]);
      data.push('__Note on usage:__ <> indicates a required field, [] indicates an optional one. Do not include these when you enter the command');
      if (command.name) data.push(`**Name:** ${command.name}`);
      if (command.description) data.push(`**Description:** ${command.description}`);
      if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
      if (command.usage) data.push(`**Usage:** ${BOT_PREFIX}${command.name} ${command.usage}`);
    }
    message.channel.send(data, { split: true });
  },
};

const statsCommand = {
  name: 'stats',
  description: 'List stats about the bot usage',
  requireAdmin: true,
  execute: (message) => {
    const { client } = message;
    const { guilds, channels } = client;

    const getGuild = channelId => guilds.find(g => g.channels.some(c => c.id === channelId));

    const guildNames = guilds.map(g => g.name);
    const guildNamesString = guildNames.join(', ');
    const guildsTerm = guildNames.length === 1 ? 'guild' : 'guilds';

    const textChannels = channels.filter(c => c.type === 'text');
    const channelNames = textChannels.map((channel) => {
      const guild = getGuild(channel.id);
      return `${guild.name}/${channel.name}`;
    });
    const channelNamesString = channelNames.join(', ');
    const channelsTerm = channelNames.length === 1 ? 'channel' : 'channels';

    getRecentRecordCounts()
      .then((recordCounts) => {
        const [dayCount, weekCount] = recordCounts;
        const dayRecordsTerm = dayCount === 1 ? 'record' : 'records';
        const weekRecordsTerm = weekCount === 1 ? 'record' : 'records';
        const messageText = `
${dayCount} ${dayRecordsTerm} recorded over the last day
${weekCount} ${weekRecordsTerm} recorded over the last week
Joined to ${guildNames.length} ${guildsTerm}: ${guildNamesString}
Joined to ${channelNames.length} ${channelsTerm}: ${channelNamesString}
        `;

        txt.generateTxt(messageText)
          .then((filename) => {
            const re = new Discord.RichEmbed()
              .attachFile(new Discord.Attachment(filename, 'stats.txt'))
              .setDescription('Here are the stats');

            message.author.send(re).then(() => {
              txt.deleteTxt(filename);
            });
          });
      });
  },
};

const sponsorsCommand = {
  name: 'sponsors',
  description: 'List the awesome sponsors of this bot!',
  aliases: ['sponsor'],
  execute: (message) => {
    getSponsors().then((names) => {
      const messageToSend = `This bot is supported by donations from the following _awesome_ sponsors:
${names}
To learn about donating, use the \`${BOT_PREFIX}donate\` command`;
      message.channel.send(messageToSend);
    });
  },
};

const donateCommand = {
  name: 'donate',
  description: 'Learn about how to donate to the maker and maintainer of this bot!',
  aliases: ['donation'],
  execute: (message) => {
    const messages = [
      'The maker of this crappy bot would really love some money to help support maintaining this trash heap!',
      'Got a wad of cash you wanna get rid of? Consider donating it to the jerk that works on this bot!',
      'Have you gotten some marginal value out of this bot? If so, donate to show you like it!',
    ];
    const randomMessage = _.sample(messages);
    const messageToSend = `${randomMessage}
If you would like to send a donation, please use ${DONATION_URL}
(Donating will get you onto the sponsors list, seen with the \`${BOT_PREFIX}sponsors\` command)`;
    message.channel.send(messageToSend);
  },
};

export default [
  pingCommand,
  helpCommand,
  statsCommand,
  sponsorsCommand,
  donateCommand,
];
