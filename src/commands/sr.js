import * as utils from '../utils';
import * as datastore from '../datastore';

const sr = (msg, kl, totalStr, rateStr, efficiencyStr) => {
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

  datastore.getLatestProgress(userId).then(function (latestProgress) {
    var description;
    if (latestProgress) {
      description = utils.generateProgressChangeSummary(kl, totalStr, latestProgress);
    } else {
      description = 'Hello! Thanks for recording your progress. I will keep track of your progress and let you know how you\'re doing over time';
    }

    var messageToSend = utils.generateSrMessage(msg, timestamp, percentage, medalsGained, percentageWithDoubled, description);

    msg.channel.send(messageToSend);

    datastore.saveProgress(kl, totalStr, rateStr, percentage, userId, username, timestamp);
  });
}

export default sr;
