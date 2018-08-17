const { Bot } = require('../index').Bot;

module.exports = {
  commands:
    [{
      name: 'ping',
      description: 'See the bots current ping',
      cooldown: 5,
      execute(message) {
        message.channel.send('Ping?').then((m) => {
          m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(Bot.client.ping)}ms`);
        });
      },
    },
    {
      name: 'help',
      description: 'List all of my commands or info about a specific command.',
      aliases: ['commands'],
      usage: '[command name]',
      cooldown: 5,
      execute(message, args) {
        const { commands } = message.client;
        const data = [];
        if (!args.length) {
          data.push('Here\'s a list of all my commands:\n`');
          data.push(commands.filter((command) => {
            let able = true;
            if (command.guildOnly && message.channel.type !== 'text') able = false;
            if (command.permission === 'BOT_OWNER') able = false;
            else if ((command.role || command.permission) && message.channel.type !== 'text') able = false;
            else if (command.role && message.member.roles.has(command.role)) able = true;
            else if (command.permission && message.member.hasPermission(command.permission)) {
              able = true;
            } else if (command.role || command.permission) able = false;
            if (message.author.id === Bot.owner) able = true;
            return able;
          }).map(command => command.name).join('`, `'));
          data.push(`\`\nYou can send \`${Bot.prefix}help [command name]\` to get info on a specific command!`);
        } else {
          if (!commands.has(args[0])) {
            message.reply('that\'s not a valid command!');
            return;
          }
          const command = commands.get(args[0]);
          data.push('__Note on usage:__ <> indicates a required field, [] indicates an optional one. Do not include these when you enter the command');
          if (command.description) data.push(`**Name:** ${command.name}`);
          if (command.description) data.push(`**Description:** ${command.description}`);
          if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
          if (command.usage) data.push(`**Usage:** ${Bot.prefix}${command.name} ${command.usage}`);
          if (command.role) data.push(`**Needed Role:** ${command.role}`);
          if (command.permission) data.push(`**Needed Permission:** ${command.permission}`);
          data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
        }
        message.author.send(data, { split: true })
          .then(() => {
            if (message.channel.type !== 'dm') {
              Bot.replyDelete(message, 'I\'ve sent you a DM with all my commands!', true);
            }
          })
          .catch(() => message.reply('it seems like I can\'t DM you!'));
      },
    }],
};
