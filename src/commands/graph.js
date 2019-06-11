import { publishChartMessage } from '../pubsub';

const graphCommand = {
  name: 'graph',
  description: 'Generate a graph of your progress over time',
  usage: '[number of days before today to retrieve data for]',
  execute: (message, args) => {
    const channelId = message.channel.id;
    const userId = message.author.id;
    const daysOfHistory = Number(args[0]) || null;

    publishChartMessage(channelId, userId, daysOfHistory);
  },
};

export default [
  graphCommand,
];
