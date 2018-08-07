import * as datastore from '../datastore';
import { generateSrHistoryMessage } from '../utils';

const srHistory = (msg) => {
  const userId = msg.author.id;

  datastore.getAllProgressEntries(userId, 512).then((progress) => {
    let description;
    if (!progress || progress.length === 0) {
      description = 'Sorry, I don\'t have any progress recorded for you. Try using the `!sr` command to record progress!';
    } else {
      description = 'Here\'s your progress to date!';
    }

    const messageToSend = generateSrHistoryMessage(progress, description);

    msg.author.send(messageToSend);
  });
};

export default srHistory;
