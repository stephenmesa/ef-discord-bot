import Discord from 'discord.js';

import * as datastore from '../datastore';
import * as csv from '../csv';

const srHistory = (msg) => {
  const userId = msg.author.id;

  datastore.getAllProgressEntries(userId, 512).then((progress) => {
    if (!progress || progress.length === 0) {
      msg.author.send('Sorry, I don\'t have any progress recorded for you. Try using the `!sr` command to record progress!');
      return;
    }

    csv.generateProgressCSV(progress)
      .then((filename) => {
        const re = new Discord.RichEmbed()
          .attachFile(new Discord.Attachment(filename, 'progress.csv'))
          .setDescription('Here\'s your progress to date!');

        msg.author.send(re).then(() => {
          csv.deleteCSV(filename);
        });
      });
  });
};

export default srHistory;
