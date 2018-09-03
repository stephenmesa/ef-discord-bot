const { BOT_PREFIX } = process.env;

export default [
  {
    name: 'ping',
    description: 'See the bots current ping',
    execute: (message) => {
      message.channel.send('Pong!');
    },
  },
  {
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
      message.author.send(data, { split: true })
        .catch(() => message.reply('it seems like I can\'t DM you!'));
    },
  },
];
