import { getRecentRecordCounts } from '../datastore';

const { BOT_PREFIX } = process.env;

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
        message.author.send(messageText);
      });
  },
};

export default [
  pingCommand,
  helpCommand,
  statsCommand,
];
