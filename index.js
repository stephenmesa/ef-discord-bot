require('dotenv').config();
var Discord = require("discord.js");
var client = new Discord.Client();

var utils = require("./utils");
var datastore = require("./datastore");
var messaging = require('./messaging');

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

  datastore.getLatestProgress(userId).then(function(latestProgress) {
    var description;
    if (latestProgress) {
      description = generateProgressChangeSummary(kl, totalStr, latestProgress);
    } else {
      description = 'Hello! Thanks for recording your progress. I will keep track of your progress and let you know how you\'re doing over time';
    }

    var messageToSend = messaging.generateSrMessage(msg, timestamp, percentage, medalsGained, percentageWithDoubled, description);

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
  var srArgsRegExp = new RegExp(/^!sr\s+(\d+)\s+(\d+(\.\d+)?\w+)\s+(\d+(\.\d+)?\w+)\s*(\d+(\.\d+)?)?/);
  var msgSrMatches = msg.content.match(srRegExp);
  var msgSrArgsMatches = msg.content.match(srArgsRegExp);

  if (msg.content === 'ping') {
    msg.reply('Pong!');
  } else if (msgCalcMatches) {
    msg.reply('The `!calc` command has been deprecated. Please use the `!sr` command instead! Usage: `!sr <knightLevel> <totalMedals> <srMedalsPerMinute> [srEfficiency]`');
  } else if (msgRecordMatches) {
    msg.reply('The `!record` command has been deprecated. Please use the `!sr` command instead! Usage: `!sr <knightLevel> <totalMedals> <srMedalsPerMinute> [srEfficiency]`');
  } else if (msgSrMatches) {
    if (!msgSrArgsMatches) {
      msg.reply('Usage:\n\n`!sr <knightLevel> <totalMedals> <srMedalsPerMinute> [srEfficiency]`\n\nExample: `!sr 280 4.4h 337.5f`');
    } else {
      var kl = msgSrArgsMatches[1];
      var totalStr = msgSrArgsMatches[2];
      var rateStr = msgSrArgsMatches[4];
      var srEfficiency = msgSrArgsMatches[6] || 1.05;
      sr(msg, kl, totalStr, rateStr, srEfficiency);
    }
  }
});

client.login(discordToken);
