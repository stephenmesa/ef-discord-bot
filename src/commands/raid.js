import * as utils from '../utils';
import * as datastore from '../datastore';
import * as bossRepository from '../bossRepository';

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

  const bossName = bossRepository.getRaidBossName(raidStage);
  if (!bossName) {
    return {
      code: 5,
      error: 'Invalid raid stage supplied, please ensure the stage exists',
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

    // TODO: grab user's previous damage on same stage to compare against
    // TODO: grab damage for similar KL on same stage

    const messageToSend = utils.generateRaidProgressMessage({
      message,
      timestamp,
      kl,
      raidStage,
      damage,
      resist,
    });

    message.channel.send(messageToSend);

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
  },
};

export default [
  raidCommand,
];
