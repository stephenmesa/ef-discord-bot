import * as utils from '../utils';
import * as datastore from '../datastore';

const srUndo = (msg) => {
  const userId = msg.author.id;
  datastore.deleteLatestProgress(userId)
    .then((result) => {
      const deletedProgress = result.deletedEntry;
      const hoursDiff = utils.getHoursSince(deletedProgress.timestamp);
      msg.reply(`deleted previous record of ${deletedProgress.kl} KL and ${deletedProgress.totalMedals} total medals, recorded ${hoursDiff.toFixed(2).toString()} hours ago`);
    })
    .catch((err) => {
      if (err.errorCode === 404) {
        msg.reply('Sorry, I couldn\'t find your most recent SR progress, it doesn\'t appear that you have any.');
      } else {
        console.error(err);
        msg.reply('Looks like stephenmesa has a terrible bug in his code. Go make fun of his programming abilities!');
      }
    });
};

export default srUndo;
