import * as utils from '../utils';
import * as datastore from '../datastore';

const srDelete = (msg, id) => {
  const userId = msg.author.id;
  datastore.deleteProgress(userId, id)
    .then((result) => {
      const deletedProgress = result.deletedEntry;
      const hoursDiff = utils.getHoursSince(deletedProgress.timestamp);
      msg.reply(`deleted previous record of ${deletedProgress.kl} KL and ${deletedProgress.totalMedals} total medals, recorded ${hoursDiff.toFixed(2).toString()} hours ago`);
    })
    .catch((err) => {
      if (err.errorCode === 404) {
        msg.reply(`Sorry, I couldn't find a progress entry with the id of ${id}.`);
      } else {
        console.error(err);
        msg.reply('Looks like stephenmesa has yet another terrible bug in his code. Go make fun of his programming abilities!');
      }
    });
};

export default srDelete;
