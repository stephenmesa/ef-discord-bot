import * as utils from '../utils';
import * as datastore from '../datastore';

const sr = (msg, kl, totalStr, rateStr, efficiencyStr) => {
  const timestamp = new Date();
  const { username } = msg.author;
  const userId = msg.author.id;
  const rate = utils.parseGoldString(rateStr);
  const total = utils.parseGoldString(totalStr);
  const efficiency = utils.parseGoldString(efficiencyStr);

  const totalMinutes = 4 * 60;
  const medalsGained = rate * totalMinutes * efficiency;

  const percentage = (medalsGained / total) * 100;
  const percentageWithDoubled = ((medalsGained * 2) / total) * 100;

  datastore.getLatestProgress(userId).then((latestProgress) => {
    let description;
    if (latestProgress) {
      description = utils.generateProgressChangeSummary(kl, totalStr, latestProgress);
    } else {
      description = 'Hello! Thanks for recording your progress. I will keep track of your progress and let you know how you\'re doing over time';
    }

    const messageToSend = utils.generateSrMessage(
      msg,
      timestamp,
      percentage,
      medalsGained,
      percentageWithDoubled,
      description,
    );

    msg.channel.send(messageToSend);

    datastore.saveProgress(kl, totalStr, rateStr, percentage, userId, username, timestamp);
  });
};

export default sr;
