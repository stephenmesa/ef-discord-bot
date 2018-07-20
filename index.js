require('dotenv').config();

var Discord = require("discord.js");
var client = new Discord.Client();
var utils = require("./utils");

var discordToken = process.env.DISCORD_TOKEN;

if (!discordToken) {
  console.error('Must provide DISCORD_TOKEN environment variable!');
  process.exit(1);
}

function calculate(msg, totalStr, rateStr, efficiencyStr) {
  var rate = utils.parseGoldString(rateStr);
  var total = utils.parseGoldString(totalStr);
  var efficiency = utils.parseGoldString(efficiencyStr);

  var totalMinutes = 4 * 60;
  var medalsGained = rate * totalMinutes * efficiency;

  var percentage = (medalsGained / total) * 100;
  var percentageWithDoubled = ((medalsGained * 2) / total) * 100;

  var messageToSend = 'User: ' + msg.author + '. Your SR rate percentage is ' +
    percentage.toFixed(2).toString() + '% (' + utils.formatGoldString(medalsGained) +
    ') without doubling and ' +
    percentageWithDoubled.toFixed(2).toString() + '% (' + utils.formatGoldString(medalsGained * 2) +
    ') with doubling.';
  msg.channel.send(messageToSend);
}

client.on('ready', function() {
  console.log('Logged in as ' + client.user.tag + '!');
});

client.on('message', function(msg) {
  var calculateRegExp = new RegExp(/^!calc/);
  var calculateArgsRegExp = new RegExp(/^!calc ([^ ]+) ([^ ]+) ([^ ]+)/);
  var msgCalcMatches = msg.content.match(calculateRegExp);
  var msgCalcArgsMatches = msg.content.match(calculateArgsRegExp);

  // TODO: Make sure this is for a channel that the bot belongs to

  if (msg.content === 'ping') {
    msg.reply('Pong!');
  } else if (msgCalcMatches) {
    if (!msgCalcArgsMatches) {
      msg.reply('Usage: `!calc <totalMedals> <srMedalsPerMinute> <srEfficiency>`');
    } else {
      calculate(msg, msgCalcArgsMatches[1], msgCalcArgsMatches[2], msgCalcArgsMatches[3]);
    }
  }
});

client.login(discordToken);
