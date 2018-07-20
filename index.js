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

  var messageToSend = {
    embed:
    {
        author: {
            name: msg.member.displayName,
            icon_url: 'https://cdn.discordapp.com/avatars/' + msg.author.id + '/' + msg.author.avatar + '.png'
        },
        footer: {
            icon_url: "https://cdn.discordapp.com/avatars/294466905073516554/dcde95b6bfc77a0a7eb62827fd87af1a.png",
            text: "NephBot created by @stephenmesa#1219"
        },
        title: "Spirit Rest calulator",
        color: 13720519,
        timestamp: new Date().toISOString(),
        fields: [
            {
                name: "Spirit Rest",
                value: percentage.toFixed(2).toString() + '% (' + utils.formatGoldString(medalsGained) + ')',
                inline: true
            },
            {
                name: "Spirit Rest Doubled",
                value: percentageWithDoubled.toFixed(2).toString() + '% (' + utils.formatGoldString(medalsGained * 2) + ')',
                inline: true
            }
        ]
    }
  }

  msg.channel.send(messageToSend);
}

client.on('ready', function() {
  console.log('Logged in as ' + client.user.tag + '!');
});

client.on('message', function(msg) {
  var calculateRegExp = new RegExp(/^!calc/);
  var calculateArgsRegExp = new RegExp(/^!calc\s*([^ ]+)\s*([^ ]+)\s*([^ ]+)?/);
  var msgCalcMatches = msg.content.match(calculateRegExp);
  var msgCalcArgsMatches = msg.content.match(calculateArgsRegExp);

  // TODO: Make sure this is for a channel that the bot belongs to

  if (msg.content === 'ping') {
    msg.reply('Pong!');
  } else if (msgCalcMatches) {
    if (!msgCalcArgsMatches) {
      msg.reply('Usage: `!calc <totalMedals> <srMedalsPerMinute> [<srEfficiency>]`');
    } else {
      var srEfficiency = msgCalcArgsMatches[3] || 1.05;
      calculate(msg, msgCalcArgsMatches[1], msgCalcArgsMatches[2], srEfficiency);
    }
  }
});

client.login(discordToken);
