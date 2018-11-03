const { BOT_PREFIX, ADMIN_USERIDS } = process.env;

const adminUserIds = ADMIN_USERIDS ? ADMIN_USERIDS.split(',') : [];
const hasAdminAccess = userId => adminUserIds.some(id => id === userId);

export default (message, client) => {
  if (!message.content.startsWith(BOT_PREFIX) || message.author.bot) return;

  const args = message.content.slice(BOT_PREFIX.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.requireAdmin && !hasAdminAccess(message.author.id)) {
    message.reply('This command requires admin access');
    return;
  }

  if (command.args && args.length < command.args) {
    let reply = `You didn't provide enough arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${BOT_PREFIX}${command.name} ${command.usage}\``;
    }

    message.channel.send(reply);
    return;
  }

  try {
    command.execute(message, args);
  } catch (error) {
    message.reply('there was an error trying to execute that command!');
  }
};
