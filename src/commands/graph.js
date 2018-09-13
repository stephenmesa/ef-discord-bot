const graphCommand = {
  name: 'graph',
  description: 'DEPRECATED',
  usage: 'DEPRECATED',
  execute: (message) => {
    message.reply('That command has been removed for now, since it seems to bloat the bot and cause it to crash!');
  },
};

export default [
  graphCommand,
];
