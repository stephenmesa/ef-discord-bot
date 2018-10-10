import Discord from 'discord.js';
import * as utils from '../utils';
import * as datastore from '../datastore';
import * as csv from '../csv';

const { BOT_PREFIX } = process.env;
const MAX_HISTORY_COUNT = 512;

const undoCommand = {
  name: 'undo',
  description: 'Undo your last recorded progress',
  execute: (message) => {
    const userId = message.author.id;
    datastore.deleteLatestProgress(userId)
      .then((result) => {
        const deletedProgress = result.deletedEntry;
        const hoursDiff = utils.getHoursSince(deletedProgress.timestamp);
        message.reply(`Deleted previous record of ${deletedProgress.kl} KL and ${deletedProgress.totalMedals} total medals, recorded ${hoursDiff.toFixed(2).toString()} hours ago`);
      })
      .catch((err) => {
        if (err.errorCode === 404) {
          message.reply('Sorry, I couldn\'t find your most recent SR progress, it doesn\'t appear that you have any.');
        } else {
          console.error(err);
          message.reply('Looks like stephenmesa has a terrible bug in his code. Go make fun of his programming abilities!');
        }
      });
  },
};

const historyCommand = {
  name: 'history',
  description: 'View your progress history',
  execute: (message) => {
    const userId = message.author.id;
    datastore.getAllProgressEntries(userId, MAX_HISTORY_COUNT).then((progress) => {
      if (!progress || progress.length === 0) {
        message.author.send(`Sorry, I don't have any progress recorded for you. Try using the '${BOT_PREFIX}record' command to record progress!`);
        return;
      }
      csv.generateProgressCSV(progress)
        .then((filename) => {
          const re = new Discord.RichEmbed()
            .attachFile(new Discord.Attachment(filename, 'progress.csv'))
            .setDescription('Here\'s your progress to date!');

          message.author.send(re).then(() => {
            csv.deleteCSV(filename);
          });
        });
    });
  },
};

const deleteCommand = {
  name: 'delete',
  description: 'Delete a record from your progress',
  usage: `<ID (use ${BOT_PREFIX}${historyCommand.name} to see IDs)>`,
  args: 1,
  execute: (message, args) => {
    const userId = message.author.id;
    const id = args[0];
    if (Number.isNaN(id)) {
      message.reply('Invalid ID supplied, please only use numbers');
      return;
    }
    datastore.deleteProgress(userId, id)
      .then((result) => {
        const deletedProgress = result.deletedEntry;
        const hoursDiff = utils.getHoursSince(deletedProgress.timestamp);
        message.reply(`Deleted previous record of ${deletedProgress.kl} KL and ${deletedProgress.totalMedals} total medals, recorded ${hoursDiff.toFixed(2).toString()} hours ago`);
      })
      .catch((err) => {
        if (err.errorCode === 404) {
          message.reply(`Sorry, I couldn't find a progress entry with the id of ${id}.`);
        } else {
          console.error(err);
          message.reply('Looks like stephenmesa has yet another terrible bug in his code. Go make fun of his programming abilities!');
        }
      });
  },
};

const recordCommand = {
  name: 'record',
  description: 'Record your progress',
  args: 1,
  aliases: ['sr'],
  usage: '<knight level> <total medals> <SR mpm> [SR multiplier(assumed 1.05 if blank)]',
  execute: (message, args) => {
    const { username } = message.author;
    const userId = message.author.id;

    if (args[0].toLowerCase() === 'undo') {
      message.reply(`This command has been deprecated, please use "${BOT_PREFIX}${undoCommand.name}" instead`);
      return;
    }
    if (args[0].toLowerCase() === 'delete') {
      message.reply(`This command has been deprecated, please use "${BOT_PREFIX}${deleteCommand.name}" instead`);
      return;
    }
    if (args[0].toLowerCase() === 'history') {
      message.reply(`This command has been deprecated, please use "${BOT_PREFIX}${historyCommand.name}" instead`);
      return;
    }

    if (args.length < 3) {
      let reply = `You didn't provide enough arguments, ${username}!`;
      reply += `\nThe proper usage would be: \`${BOT_PREFIX}record <knight level> <total medals> <SR mpm> [SR multiplier(assumed 1.05 if blank)]\``;
      message.channel.send(reply);
      return;
    }

    const kl = Number(args[0]);
    const totalStr = args[1];
    const totalMdl = utils.parseGoldString(totalStr);
    const rateStr = args[2];
    const srMpm = utils.parseGoldString(rateStr);
    const srEfficiency = args[3] || 1.05;
    const timestamp = new Date();

    if (Number.isNaN(kl)) {
      message.reply('Invalid knight level provided, please ensure you only use numbers');
      return;
    }
    if (totalMdl == null) {
      message.reply('Invalid total medals supplied, please try again');
      return;
    }
    if (srMpm == null) {
      message.reply('Invalid SR MPM supplied, please try again');
      return;
    }
    if (Number.isNaN(Number(srEfficiency))) {
      message.reply('Invalid SR efficiency supplied, please try again. It should be a number like 1.05 (so no letters)');
      return;
    }
    const totalMinutes = 4 * 60;
    const medalsGained = srMpm * totalMinutes * srEfficiency;

    const percentage = (medalsGained / totalMdl) * 100;
    const percentageWithDoubled = ((medalsGained * 2) / totalMdl) * 100;

    datastore.getLatestProgress(userId).then((latestProgress) => {
      let description;
      if (latestProgress) {
        description = utils.generateProgressChangeSummary(kl, totalMdl, latestProgress);
      } else {
        description = 'Hello! Thanks for recording your progress. I will keep track of your progress and let you know how you\'re doing over time';
      }

      const messageToSend = utils.generateSrMessage(
        message,
        timestamp,
        percentage,
        medalsGained,
        percentageWithDoubled,
        description,
      );
      message.channel.send(messageToSend);
      datastore.saveProgress(kl, totalStr, rateStr, percentage, userId, username, timestamp);
    });
  },
};

const gradeCommand = {
  name: 'grade',
  description: 'View your progress grade',
  execute: (message) => {
    const userId = message.author.id;
    datastore.getLatestProgress(userId).then((latestProgress) => {
      if (!latestProgress) {
        message.reply(`Sorry, I don't have any progress recorded for you. Try using the '${BOT_PREFIX}record' command to record progress!`);
        return;
      }
      const { kl, percentage } = latestProgress;
      const nearbyRange = 1;
      const minKL = kl - nearbyRange;
      const maxKL = kl + nearbyRange;
      datastore.getAllProgressEntriesForKLRange(minKL, maxKL, MAX_HISTORY_COUNT)
        .then((progress) => {
          if (!progress || progress.length === 0) {
            message.reply(`Sorry, I don't have any progress recorded for KL${kl}.`);
            return;
          }
          const assessment = utils.assessProgress(latestProgress, progress);
          const recordPluralization = assessment.n > 1 ? 's' : '';
          const recordCountDescription = `${assessment.n} record${recordPluralization}`;
          const messageText = `Your SR grade is ${assessment.score}/100. (Your percentage is ${percentage.toFixed(2).toString()}% with an average percentage of ${assessment.percentageAverage.toFixed(2).toString()}% between KL${minKL} and KL${maxKL}, based on ${recordCountDescription})`;

          message.reply(messageText);
        });
    });
  },
};

export default [
  recordCommand,
  undoCommand,
  historyCommand,
  deleteCommand,
  gradeCommand,
];
