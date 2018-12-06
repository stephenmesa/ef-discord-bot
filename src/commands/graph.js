import { publishChartMessage } from '../pubsub';

const graphCommand = {
  name: 'graph',
  description: 'Work In Progress',
  execute: (message) => {
    const userId = message.author.id;
    const graphUrl = `https://ef-discord-bot.appspot.com/graph/${userId}`;
    message.reply(`That command has been removed for now, since it seems to bloat the bot and cause it to crash! Here's a beta version of the graphing site: ${graphUrl}`);
  },
};

const graphBetaCommand = {
  name: 'graphbeta',
  description: 'Work In Progress',
  execute: (message) => {
    const channelId = message.channel.id;
    const userId = message.author.id;
    publishChartMessage(channelId, userId);
  },
};

export default [
  graphCommand,
  graphBetaCommand,
];
