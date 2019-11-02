import Discord from 'discord.js';

import * as utils from '../utils';
import * as datastore from '../datastore';
import * as csv from '../csv';

const { BOT_PREFIX } = process.env;
const MAX_HISTORY_COUNT = 512;

const undoCommand = {
  name: 'undo',
  description: 'Undo your last recorded progress',
  args: 1,
  usage: '<raid|sr>',
  execute: (message, args) => {
    const undoType = args[0].toLowerCase();
    const userId = message.author.id;

    if (args.length > 1) {
      message.reply(`you provided too many arguments. The usage is \`${BOT_PREFIX}${undoCommand.name} ${undoCommand.usage}\``);
      return;
    }

    switch (undoType) {
      case 'sr':
        datastore.deleteLatestSR(userId)
          .then((result) => {
            const deletedSR = result.deletedEntry;
            const hoursDiff = utils.getHoursSince(deletedSR.timestamp);
            message.reply(`Deleted previous SR record of ${deletedSR.kl} KL and ${deletedSR.totalMedals} total medals, recorded ${hoursDiff.toFixed(2).toString()} hours ago`);
          })
          .catch((err) => {
            if (err.errorCode === 404) {
              message.reply('Sorry, I couldn\'t find your most recent SR progress, it doesn\'t appear that you have any.');
            } else {
              console.error(err);
              message.reply('Looks like stephenmesa has a terrible bug in his code for undoing SR records. Go make fun of his programming abilities!');
            }
          });
        break;
      case 'raid':
        datastore.deleteLatestRaid(userId)
          .then((result) => {
            const deletedRaid = result.deletedEntry;
            const hoursDiff = utils.getHoursSince(deletedRaid.timestamp);
            message.reply(`Deleted previous raid record of ${deletedRaid.raidStageString} for ${deletedRaid.damage} damage, recorded ${hoursDiff.toFixed(2).toString()} hours ago`);
          })
          .catch((err) => {
            if (err.errorCode === 404) {
              message.reply('Sorry, I couldn\'t find your most recent raid progress, it doesn\'t appear that you have any.');
            } else {
              console.error(err);
              message.reply('Looks like stephenmesa has a terrible bug in his code for undoing raid records. Go make fun of his programming abilities!');
            }
          });
        break;
      default:
        message.reply('Must provide either `sr` or `raid` as the type of record to undo');
        break;
    }
  },
};

const historyCommand = {
  name: 'history',
  description: 'View your progress history',
  args: 1,
  usage: '<raid|sr>',
  execute: (message, args) => {
    const historyType = args[0].toLowerCase();
    const userId = message.author.id;

    if (args.length > 1) {
      message.reply(`you provided too many arguments. The usage is \`${BOT_PREFIX}${historyCommand.name} ${historyCommand.usage}\``);
      return;
    }

    switch (historyType) {
      case 'sr':
        datastore.getAllSREntries(userId, MAX_HISTORY_COUNT).then((entries) => {
          if (!entries || entries.length === 0) {
            message.author.send(`Sorry, I don't have any SR entries recorded for you. Try using the '${BOT_PREFIX}sr' command to record SR entries!`);
            return;
          }
          csv.generateSRCSV(entries)
            .then((filename) => {
              const re = new Discord.RichEmbed()
                .attachFile(new Discord.Attachment(filename, 'sr-history.csv'))
                .setDescription('Here\'s your SR entries to date!');

              message.author.send(re).then(() => {
                csv.deleteCSV(filename);
              });
            });
        });
        break;
      case 'raid':
        datastore.getAllRaidEntries(userId, MAX_HISTORY_COUNT).then((entries) => {
          if (!entries || entries.length === 0) {
            message.author.send(`Sorry, I don't have any Raid entries recorded for you. Try using the '${BOT_PREFIX}raid' command to record raid entries!`);
            return;
          }
          csv.generateRaidCSV(entries)
            .then((filename) => {
              const re = new Discord.RichEmbed()
                .attachFile(new Discord.Attachment(filename, 'raid-history.csv'))
                .setDescription('Here\'s your Raid entries to date!');

              message.author.send(re).then(() => {
                csv.deleteCSV(filename);
              });
            });
        });
        break;
      default:
        message.reply('Must provide either `sr` or `raid` as the type of record to retrieve history for');
        break;
    }
  },
};

const deleteCommand = {
  name: 'delete',
  description: 'Delete a record from your progress',
  usage: `<raid|sr> <ID (use ${BOT_PREFIX}${historyCommand.name} to see IDs)>`,
  args: 2,
  execute: (message, args) => {
    const deleteType = args[0].toLowerCase();
    const userId = message.author.id;
    const id = args[1];
    if (Number.isNaN(id)) {
      message.reply('Invalid ID supplied, please only use numbers');
      return;
    }

    switch (deleteType) {
      case 'sr':
        datastore.deleteSREntry(userId, id)
          .then((result) => {
            const deletedEntry = result.deletedEntry;
            const hoursDiff = utils.getHoursSince(deletedEntry.timestamp);
            message.reply(`Deleted previous SR record of ${deletedEntry.kl} KL and ${deletedEntry.totalMedals} total medals, recorded ${hoursDiff.toFixed(2).toString()} hours ago`);
          })
          .catch((err) => {
            if (err.errorCode === 404) {
              message.reply(`Sorry, I couldn't find a SR progress entry with the id of ${id}.`);
            } else {
              console.error(err);
              message.reply('Looks like stephenmesa has yet another terrible bug in his code. Go make fun of his programming abilities!');
            }
          });
        break;
      case 'raid':
        datastore.deleteRaidEntry(userId, id)
          .then((result) => {
            const deletedEntry = result.deletedEntry;
            const hoursDiff = utils.getHoursSince(deletedEntry.timestamp);
            message.reply(`Deleted previous raid record for ${deletedEntry.raidStageString} at ${deletedEntry.kl} KL for ${deletedEntry.damage} damage, recorded ${hoursDiff.toFixed(2).toString()} hours ago`);
          })
          .catch((err) => {
            if (err.errorCode === 404) {
              message.reply(`Sorry, I couldn't find a raid entry with the id of ${id}.`);
            } else {
              console.error(err);
              message.reply('Looks like stephenmesa has yet another terrible bug in his code. Go make fun of his programming abilities!');
            }
          });
        break;
      default:
        message.reply('Must provide either `sr` or `raid` as the type of record to delete');
        break;
    }
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

    if (!utils.validatePercentage(percentage)) {
      message.reply(`Invalid percentage calculated of ${percentage}, please try again`);
      return;
    }

    // First grab previous progress to compare against
    datastore.getLatestProgress(userId).then((latestProgress) => {
      const nearbyRange = 1;
      const minKL = kl - nearbyRange;
      const maxKL = kl + nearbyRange;

      // now grab all of the progresses for this KL range
      // (which should not include the new progress)
      datastore.getAllProgressEntriesForKLRange(minKL, maxKL, MAX_HISTORY_COUNT)
        .then((progress) => {
          let description;
          if (latestProgress) {
            description = utils.generateProgressChangeSummary(kl, totalMdl, latestProgress);
          } else {
            description = `Hello! Thanks for recording your progress. I will keep track of your progress and let you know how you're doing over time.
    You can now use the \`${BOT_PREFIX}grade\` and \`${BOT_PREFIX}graph\` commands to see metrics about your progress. Use \`${BOT_PREFIX}help\` to find out more information about those commands`;
          }

          const currentProgress = {
            kl,
            totalMedals: medalsGained,
            rate: rateStr,
            percentage,
            userId,
            username,
            timestamp,
          };

          // Use a combination of the existing progresses and this current progress
          const assessableProgress = progress.concat([currentProgress]);

          const assessment = utils.assessProgress(percentage, assessableProgress);

          const messageToSend = utils.generateSrMessage(
            message,
            timestamp,
            percentage,
            medalsGained,
            percentageWithDoubled,
            description,
            assessment,
          );
          message.channel.send(messageToSend);

          datastore.saveProgress(kl, totalStr, rateStr, percentage, userId, username, timestamp);
        });
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
      const timestamp = new Date();

      datastore.getAllProgressEntriesForKLRange(minKL, maxKL, MAX_HISTORY_COUNT)
        .then((progress) => {
          if (!progress || progress.length === 0) {
            message.reply(`Sorry, I don't have any progress recorded for KL${kl}.`);
            return;
          }
          const assessment = utils.assessProgress(latestProgress.percentage, progress);

          const messageToSend = utils.generateSrGradeMessage(
            message,
            timestamp,
            assessment,
            kl,
            percentage,
          );

          message.channel.send(messageToSend);
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
