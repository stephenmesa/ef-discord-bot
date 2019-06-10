import { publishChartMessage } from '../pubsub';

const { BOT_PREFIX } = process.env;

const graphCommand = {
  name: 'graph',
  description: 'Generate a graph of your progress over time',
  execute: (message, args) => {
    const channelId = message.channel.id;
    const userId = message.author.id;
    const daysOfHistory = Number(args[0]) || null;

    publishChartMessage(channelId, userId, daysOfHistory);
  },
};

const graphBetaCommand = {
  name: 'graphbeta',
  description: 'This command has been removed',
  execute: (message) => {
    message.reply(`This command has been removed. Please use the \`${BOT_PREFIX}graph\` command instead.`);
  },
};

export default [
  graphCommand,
  graphBetaCommand,
];
