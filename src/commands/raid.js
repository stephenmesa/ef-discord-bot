import * as utils from '../utils';
import * as datastore from '../datastore';
import * as bossRepository from '../bossRepository';
import {
  MAX_HISTORY_COUNT,
  KL_COHORT_COEFFICIENT,
} from '../consts';

export const validateAndGetRaidCommandArgs = (args) => {
  const kl = Number(args[0]);
  const raidStageString = args[1];
  const raidStage = utils.parseRaidString(raidStageString);
  const damageStr = args[2];
  const damage = utils.parseGoldString(damageStr);
  const resist = args[3] || 0;

  if (Number.isNaN(kl)) {
    return {
      code: 1,
      error: 'Invalid knight level provided, please ensure you only use numbers',
    };
  }
  if (raidStage == null) {
    return {
      code: 2,
      error: 'Invalid raid stage supplied, please ensure you use the format x.y.z (e.g. 4.3.4)',
    };
  }
  if (damage == null) {
    return {
      code: 3,
      error: 'Invalid damage supplied, please ensure you only use numbers',
    };
  }
  if (Number.isNaN(Number(resist))) {
    return {
      code: 4,
      error: 'Invalid resist supplied, please ensure you only use numbers',
    };
  }

  const stageData = bossRepository.getStageData(raidStage);
  if (!stageData) {
    return {
      code: 5,
      error: 'Invalid raid stage supplied, please ensure the stage exists',
    };
  }

  if (damage > stageData.health) {
    return {
      code: 6,
      error: `Damage cannot exceed health of boss. (${raidStage.raid}.${raidStage.stage} ${stageData.name} has ${stageData.health} health)`,
    };
  }

  return {
    code: 0,
    kl,
    raidStageString,
    raidStage,
    damage,
    resist,
  };
};

const raidCommand = {
  name: 'raid',
  description: 'Record your raid damage',
  args: 3,
  usage: '<knight level> <raid stage> <total damage> [resist amount]',
  execute: (message, args) => {
    const {
      username,
      userId,
    } = utils.getUserDataFromMessage(message);

    const timestamp = new Date();

    const parsedArgs = validateAndGetRaidCommandArgs(args);

    if (parsedArgs.code !== 0) {
      message.reply(parsedArgs.error);
      return;
    }

    const {
      kl,
      raidStageString,
      raidStage,
      damage,
      resist,
    } = parsedArgs;

    datastore.getRaidEntriesForStage(raidStage, MAX_HISTORY_COUNT).then((previousEntries) => {
      const isOneShot = utils.isRaidOneShot(raidStageString, damage);

      const previousOneShotEntries = previousEntries.filter(entry => utils.isRaidOneShot(
        entry.raidStageString,
        entry.damage,
      ));

      const oneShotUserIds = previousOneShotEntries.reduce((unique, item) => (
        unique.includes(item.userId) ? unique : [...unique, item.userId]
      ), []);

      const numberOfOneShots = oneShotUserIds.length;

      const usersPreviousEntries = previousEntries.filter(entry => entry.userId === userId);

      const usersExistingOneShotEntries = usersPreviousEntries.filter(entry => utils.isRaidOneShot(
        entry.raidStageString,
        entry.damage,
      ));
      const firstOneShotForUser = isOneShot && usersExistingOneShotEntries.length === 0;

      const usersPreviousEntriesWithMoreDamage = usersPreviousEntries
        .filter(entry => entry.damage >= damage);
      const personalRecord = firstOneShotForUser
        || (usersPreviousEntriesWithMoreDamage.length === 0);

      const cohortEntries = previousEntries
        .filter(entry => entry.userId !== userId
          && Math.abs(entry.kl - kl) <= KL_COHORT_COEFFICIENT);

      const raidGrade = utils.getRaidGrade({ damage, cohortEntries });

      const messageToSend = utils.generateRaidProgressMessage({
        message,
        timestamp,
        kl,
        raidStage,
        damage,
        resist,
        firstOneShotForUser,
        personalRecord,
        numberOfOneShots,
        raidGrade,
      });

      message.channel.send(messageToSend).catch(utils.handleSendMessageError(message));

      datastore.saveRaidDamage({
        kl,
        raidStageString,
        raidStage,
        damage,
        resist,
        userId,
        username,
        timestamp,
      });
    });
  },
};

export default [
  raidCommand,
];
