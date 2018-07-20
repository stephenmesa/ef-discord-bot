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

function record(msg, kl, totalMedals) {
  var timestamp = new Date();
  var username = msg.member.displayName;
  datastore.getLatestProgress(username).then(function(latestProgress) {
    if (latestProgress) {
      var progressMessage = generateProgressChangeSummary(kl, totalMedals, latestProgress);
      msg.reply(progressMessage);
    } else {
      msg.reply('Hello! Thanks for recording your progress. I will keep track of your progress and let you know how you\'re doing over time');
    }
  });
  datastore.saveProgress(kl, totalMedals, username, timestamp);
}

client.on('ready', function() {
  console.log('Logged in as ' + client.user.tag + '!');
});

client.on('message', function(msg) {
  var calculateRegExp = new RegExp(/^!calc/);
  var calculateArgsRegExp = new RegExp(/^!calc\s*([^ ]+)\s*([^ ]+)\s*([^ ]+)?/);
  var msgCalcMatches = msg.content.match(calculateRegExp);
  var msgCalcArgsMatches = msg.content.match(calculateArgsRegExp);

  var recordRegExp = new RegExp(/^!record/);
  var recordArgsRegExp = new RegExp(/^!record\s*([^ ]+)\s*([^ ]+)?/);
  var msgRecordMatches = msg.content.match(recordRegExp);
  var msgRecordArgsMatches = msg.content.match(recordArgsRegExp);

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
  } else if (msgRecordMatches) {
    if (!msgRecordArgsMatches) {
      msg.reply('Usage: `!record <knightLevel> <totalMedals>`');
    } else {
      record(msg, msgRecordArgsMatches[1], msgRecordArgsMatches[2]);
    }
  }
});

client.login(discordToken);
