require('dotenv').config();

var Discord = require("discord.js");
var client = new Discord.Client();
var utils = require("./utils");
var datastore = require("./datastore");

var discordToken = process.env.DISCORD_TOKEN;

if (!discordToken) {
  console.error('Must provide DISCORD_TOKEN environment variable!');
  process.exit(1);
}

function sr(msg, kl, totalStr, rateStr, efficiencyStr) {
  var timestamp = new Date();
  var username = msg.author.username;
  var userId = msg.author.id;
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
        title: "Spirit Rest calculator",
        color: 13720519,
        timestamp: timestamp.toISOString(),
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

  datastore.getLatestProgress(userId).then(function(latestProgress) {
    if (latestProgress) {
      var progressMessage = generateProgressChangeSummary(kl, totalStr, latestProgress);
      messageToSend.embed.description = progressMessage;
    } else {
      messageToSend.embed.description = 'Hello! Thanks for recording your progress. I will keep track of your progress and let you know how you\'re doing over time';
    }

    msg.channel.send(messageToSend);

    datastore.saveProgress(kl, totalStr, rateStr, percentage, userId, username, timestamp);
  });
}

function generateProgressChangeSummary(currentKL, currentTotalMedals, latestProgress) {
  var currentTotalMedalsNumber = utils.parseGoldString(currentTotalMedals);
  var previousTotalMedalsNumber = utils.parseGoldString(latestProgress.totalMedals);
  var medalsGained = currentTotalMedalsNumber - previousTotalMedalsNumber;
  var medalsGainedPercentage = (medalsGained / previousTotalMedalsNumber) * 100;
  var klGained = currentKL - latestProgress.kl;
  var now = new Date();
  var hoursDiff = (now.getTime() - latestProgress.timestamp.getTime())/(1000*60*60);
  return 'Welcome back! You\'ve gained ' + klGained + ' KL and ' + medalsGainedPercentage.toFixed(2).toString() + '% total medals over the last ' + hoursDiff.toFixed(2).toString() + ' hour(s)';
}

client.on('ready', function() {
  console.log('Logged in as ' + client.user.tag + '!');
});

client.on('message', function(msg) {
  var calculateRegExp = new RegExp(/^!calc/);
  var msgCalcMatches = msg.content.match(calculateRegExp);

  var recordRegExp = new RegExp(/^!record/);
  var msgRecordMatches = msg.content.match(recordRegExp);

  var srRegExp = new RegExp(/^!sr/);
  var srArgsRegExp = new RegExp(/^!sr\s+(\S+)\s+(\S+)\s+(\S+)\s*(\S+)?/);
  var msgSrMatches = msg.content.match(srRegExp);
  var msgSrArgsMatches = msg.content.match(srArgsRegExp);

  // TODO: Make sure this is for a channel that the bot belongs to

  if (msg.content === 'ping') {
    msg.reply('Pong!');
  } else if (msgCalcMatches) {
    msg.reply('The `!calc` command has been deprecated. Please use the `!sr` command instead! Usage: `!sr <knightLevel> <totalMedals> <srMedalsPerMinute> [srEfficiency]`');
  } else if (msgRecordMatches) {
    msg.reply('The `!record` command has been deprecated. Please use the `!sr` command instead! Usage: `!sr <knightLevel> <totalMedals> <srMedalsPerMinute> [srEfficiency]`');
  } else if (msgSrMatches) {
    if (!msgSrArgsMatches) {
      msg.reply('Usage: `!sr <knightLevel> <totalMedals> <srMedalsPerMinute> [srEfficiency]`');
    } else {
      var srEfficiency = msgSrArgsMatches[4] || 1.05;
      sr(msg, msgSrArgsMatches[1], msgSrArgsMatches[2], msgSrArgsMatches[3], srEfficiency);
    }
  }
});

client.login(discordToken);
