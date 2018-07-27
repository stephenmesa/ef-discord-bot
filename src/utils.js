function parseGoldString(gold) {
  if (isFinite(gold)) {
    return Number(gold);
  }

  // make sure the string follows the template of {number}{letters}
  var efGoldFormatRegExp = new RegExp(/(^\d+\.?\d*)(\D?)$/);

  var matches = gold.match(efGoldFormatRegExp);
  if (!matches) {
    return null;
  }

  var numPart = matches[1];
  var multiplierPart = matches[2].toLowerCase();
  var multiplier = 1;

  if (multiplierPart) {
    var multiplierCharCode = multiplierPart.charCodeAt(0);
    var aCharCode = 'a'.charCodeAt(0);
    multiplier = Math.pow(10, (multiplierCharCode - (aCharCode - 1)) * 3);
  }

  return Number(numPart) * multiplier;
}

function formatGoldString(gold) {
  if (!isFinite(gold)) {
    return 'Could not parse number: ' + gold.toString();
  }

  var tempGold = gold;
  var multiplier = 0;

  while (tempGold >= 1000) {
    tempGold = Math.floor(tempGold) / 1000;
    multiplier += 1;
  }

  var multiplierCharCode = 'a'.charCodeAt(0) - 1 + multiplier;
  var multiplerChar = multiplier ? String.fromCharCode(multiplierCharCode) : '';

  return tempGold.toString() + multiplerChar;
}

function generateProgressChangeSummary(currentKL, currentTotalMedals, latestProgress) {
  var currentTotalMedalsNumber = parseGoldString(currentTotalMedals);
  var previousTotalMedalsNumber = parseGoldString(latestProgress.totalMedals);
  var medalsGained = currentTotalMedalsNumber - previousTotalMedalsNumber;
  var medalsGainedPercentage = (medalsGained / previousTotalMedalsNumber) * 100;
  var klGained = currentKL - latestProgress.kl;
  var now = new Date();
  var hoursDiff = (now.getTime() - latestProgress.timestamp.getTime()) / (1000 * 60 * 60);
  return 'Welcome back! You\'ve gained ' + klGained + ' KL and ' + medalsGainedPercentage.toFixed(2).toString() + '% total medals over the last ' + hoursDiff.toFixed(2).toString() + ' hour(s)';
}

function generateSrMessage(msg, timestamp, percentage, medalsGained, percentageWithDoubled, description) {
  return {
    embed: {
      description: description,
      author: {
        name: msg.member.displayName,
        icon_url: 'https://cdn.discordapp.com/avatars/' + msg.author.id + '/' + msg.author.avatar + '.png'
      },
      footer: {
        icon_url: "https://cdn.discordapp.com/avatars/294466905073516554/dcde95b6bfc77a0a7eb62827fd87af1a.png",
        text: "NephBot created by @stephenmesa#1219"
      },
      title: "Spirit Rest Calculator",
      color: 13720519,
      timestamp: timestamp.toISOString(),
      fields: [{
          name: "Spirit Rest",
          value: percentage.toFixed(2).toString() + '% (' + formatGoldString(medalsGained) + ')',
          inline: true
        },
        {
          name: "Spirit Rest Doubled",
          value: percentageWithDoubled.toFixed(2).toString() + '% (' + formatGoldString(medalsGained * 2) + ')',
          inline: true
        }
      ]
    }
  };
}

function getHoursSince(timestamp) {
  (now.getTime() - timestamp.getTime())/(1000*60*60);
}

module.exports = {
  parseGoldString: parseGoldString,
  formatGoldString: formatGoldString,
  generateProgressChangeSummary: generateProgressChangeSummary,
  generateSrMessage: generateSrMessage,
  getHoursSince: getHoursSince,
};
