import Discord from 'discord.js';

const { BOT_PREFIX, ADMIN_USERIDS } = process.env;

const adminUserIds = ADMIN_USERIDS ? ADMIN_USERIDS.split(',') : [];
const hasAdminAccess = userId => adminUserIds.some(id => id === userId);

const cooldowns = new Discord.Collection();

const getSecondsToWaitForCooldown = (commandName, userId, cooldownSeconds = 3) => {
  if (!cooldowns.has(commandName)) {
    cooldowns.set(commandName, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(commandName);
  const cooldownAmount = cooldownSeconds * 1000;
  if (!timestamps.has(userId)) {
    timestamps.set(userId, now);
    setTimeout(() => timestamps.delete(userId), cooldownAmount);
  } else {
    const expirationTime = timestamps.get(userId) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return timeLeft;
    }
    timestamps.set(userId, now);
    setTimeout(() => timestamps.delete(userId), cooldownAmount);
  }

  return null;
};

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

  const secondsToWait = getSecondsToWaitForCooldown(
    command.name,
    message.author.id,
    command.cooldown,
  );
  if (secondsToWait) {
    message.reply(`Please wait ${secondsToWait.toFixed(1)} more second(s) before reusing the \`${command.name}\` command`);
    return;
  }

  try {
    command.execute(message, args);
  } catch (error) {
    message.reply('there was an error trying to execute that command!');
  }
};
