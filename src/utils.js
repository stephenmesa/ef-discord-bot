import _ from 'lodash';
import { quantileRank } from 'simple-statistics';
import Discord from 'discord.js';

// Let's assume that it's impossible to achieve an SR rate above 100%
// (usually it's below 10%, so this should be fairly conservative)
export const validatePercentage = p => !!p && p > 0 && p < 100;

export const parseGoldString = (gold) => {
  if (Number.isFinite(gold)) {
    return Number(gold);
  }

  // make sure the string follows the template of {number}{letters}
  const efGoldFormatRegExp = new RegExp(/(^\d+\.?\d*)(\D?)$/);

  const matches = gold.replace(',', '.').match(efGoldFormatRegExp);
  if (!matches) {
    return null;
  }

  const numPart = matches[1];
  const multiplierPart = matches[2].toLowerCase();
  let multiplier = 1;

  if (multiplierPart) {
    const multiplierCharCode = multiplierPart.charCodeAt(0);
    const aCharCode = 'a'.charCodeAt(0);
    multiplier = 10 ** ((multiplierCharCode - (aCharCode - 1)) * 3);
  }

  return Number(numPart) * multiplier;
};

export const formatGoldString = (gold) => {
  if (!Number.isFinite(gold)) {
    return `Could not parse number: ${gold.toString()}`;
  }

  let tempGold = gold;
  let multiplier = 0;

  while (tempGold >= 1000) {
    tempGold = Math.floor(tempGold) / 1000;
    multiplier += 1;
  }

  const multiplierCharCode = 'a'.charCodeAt(0) - 1 + multiplier;
  const multiplerChar = multiplier ? String.fromCharCode(multiplierCharCode) : '';

  return tempGold.toString() + multiplerChar;
};

export const getHoursSince = (timestamp) => {
  const now = new Date();
  return (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60);
};

export const generateProgressChangeSummary = (currentKL, currentTotalMedals, latestProgress) => {
  const currentTotalMedalsNumber = parseGoldString(currentTotalMedals);
  const previousTotalMedalsNumber = parseGoldString(latestProgress.totalMedals);
  const medalsGained = currentTotalMedalsNumber - previousTotalMedalsNumber;
  const medalsGainedPercentage = (medalsGained / previousTotalMedalsNumber) * 100;
  const klGained = currentKL - latestProgress.kl;
  const hoursDiff = getHoursSince(latestProgress.timestamp);
  return `Welcome back! You've gained ${klGained} KL and ${medalsGainedPercentage.toFixed(2).toString()}% total medals over the last ${hoursDiff.toFixed(2).toString()} hour(s).`;
};

export const generateSrMessage = (
  msg,
  timestamp,
  percentage,
  medalsGained,
  percentageWithDoubled,
  description,
  assessment,
) => {
  const srFields = [
    {
      name: 'Spirit Rest',
      value: `${percentage.toFixed(2).toString()}% (${formatGoldString(medalsGained)})`,
      inline: true,
    },
    {
      name: 'Spirit Rest Doubled',
      value: `${percentageWithDoubled.toFixed(2).toString()}% (${formatGoldString(medalsGained * 2)})`,
      inline: true,
    },
  ];
  const gradeField = [
    {
      name: 'SR Grade',
      value: assessment && assessment.score !== null ? `${assessment.score}/100` : 'Sorry, but your grade could not be calculated based on lack of data',
      inline: true,
    },
  ];
  const gradeKLFields = _.values(_.mapValues(assessment.kls, (klAssessment, groupKL) => ({
    name: `KL${groupKL} (${klAssessment.n} record${klAssessment.n > 1 ? 's' : ''})`,
    value: `${klAssessment.percentageMin}%-${klAssessment.percentageMax}%`,
    inline: true,
  })));

  return {
    embed: {
      description,
      author: {
        name: msg.member.displayName,
        icon_url: msg.author.avatar ? `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png` : undefined,
      },
      footer: {
        icon_url: 'https://cdn.discordapp.com/avatars/294466905073516554/07714791affb9af210756ce2565e6488.png',
        text: 'NephBot created by @stephenmesa#1219',
      },
      title: 'Spirit Rest Calculator',
      color: 13720519,
      timestamp: timestamp.toISOString(),
      fields: _.union(srFields, gradeField, gradeKLFields),
    },
  };
};

export const filterOutlierProgresses = records => records
  .filter(record => validatePercentage(record.percentage));

export const assessProgress = (currentPercentage, comparableProgresses) => {
  const normalizedProgresses = filterOutlierProgresses(comparableProgresses);
  const allPercentages = normalizedProgresses.map(p => p.percentage);

  const klProgresses = _.groupBy(normalizedProgresses, 'kl');

  const kls = _.mapValues(klProgresses, (progresses) => {
    const percentages = progresses.map(e => e.percentage);
    const percentageMin = Math.min(...percentages);
    const percentageMax = Math.max(...percentages);
    const n = progresses.length;

    return {
      n,
      percentageMin: Number(percentageMin.toFixed(2)),
      percentageMax: Number(percentageMax.toFixed(2)),
    };
  });

  let score = null;
  if (normalizedProgresses.length > 0) {
    const scoreDecimal = quantileRank(allPercentages, currentPercentage);
    score = Math.round(scoreDecimal * 100);
  }

  return {
    kls,
    score,
  };
};

export const generateSrGradeMessage = (
  message,
  timestamp,
  assessment,
  kl,
  percentage,
) => {
  const klFields = _.values(_.mapValues(assessment.kls, (klAssessment, groupKL) => ({
    name: `KL${groupKL} (${klAssessment.n} record${klAssessment.n > 1 ? 's' : ''})`,
    value: `${klAssessment.percentageMin}%-${klAssessment.percentageMax}%`,
    inline: true,
  })));

  const description = assessment.score
    ? `Your SR grade is **${assessment.score}/100**`
    : 'Sorry, but your grade could not be calculated based on lack of data';


  return {
    embed: {
      description,
      author: {
        name: `${message.member.displayName} (KL${kl} ${percentage.toFixed(2)}%)`,
        icon_url: message.author.avatar ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png` : undefined,
      },
      footer: {
        icon_url: 'https://cdn.discordapp.com/avatars/294466905073516554/07714791affb9af210756ce2565e6488.png',
        text: 'NephBot created by @stephenmesa#1219',
      },
      title: 'SR Grade',
      color: 13720519,
      timestamp: timestamp.toISOString(),
      fields: klFields,
    },
  };
};

export const getUserDataFromMessage = message => ({
  username: message.author.username,
  userId: message.author.id,
});

export const parseRaidString = (raidString) => {
  if (!raidString) {
    return null;
  }

  if (typeof raidString !== 'string') {
    return null;
  }

  const raidRegexp = /^(\d+)\.(\d+)\.(\d+)$/g;
  const match = raidRegexp.exec(raidString);

  if (!match) {
    return null;
  }

  return {
    raid: Number(match[1]),
    stage: Number(match[2]),
    boss: Number(match[3]),
  };
};

const raidNamesLookup = {
  1: {
    name: 'Ancient Ruins',
    color: 0xffd966,
    1: { name: 'Scorpion', imageFilename: 'famine-scorpion.png' },
    2: { name: 'Harpy', imageFilename: 'harpy.png' },
    3: { name: 'Flame Titan', imageFilename: 'titan.png' },
    4: { name: 'Belial', imageFilename: 'belial.png' },
  },
  2: {
    name: 'Burning Earth',
    color: 0xe06665,
    1: { name: 'Basilisk', imageFilename: 'basilisk.png' },
    2: { name: 'Salim', imageFilename: 'salim.png' },
    3: { name: 'Ignis', imageFilename: 'ignis.png' },
    4: { name: 'Bahamut', imageFilename: 'bahamut.png' },
  },
  3: {
    name: 'Swamp of Death',
    color: 0x93c47d,
    1: { name: 'Taratoad', imageFilename: 'taratoad.png' },
    2: { name: 'Nerugal', imageFilename: 'nerugal.png' },
    3: { name: 'Gorgos', imageFilename: 'gorgos.png' },
    4: { name: 'Beelzebub', imageFilename: 'beelzebub.png' },
  },
  4: {
    name: 'Fortress of Hell Lord',
    color: 0x8e7cc3,
    1: { name: 'Hell griffin', imageFilename: 'griffin.png' },
    2: { name: 'Zombie boar', imageFilename: 'boar.png' },
    3: { name: 'Twin Head Bone Wyvern', imageFilename: 'wyvern.png' },
    4: { name: 'Ancient Death Dragon', imageFilename: 'death-dragon.png' },
    5: { name: 'Hell Lord Amaimon', imageFilename: 'mamon.png' },
  },
  5: {
    name: 'Ancient Frozen Civilization',
    color: 0x4a86e8,
    1: { name: 'Urbos', imageFilename: 'urubos.png' },
    2: { name: 'King of the Ice Valley', imageFilename: 'fenril.png' },
    3: { name: 'The Destroyer', imageFilename: 'destroyer-collossus.png' },
    4: { name: 'King of Snowstorm', imageFilename: 'skashka.png' },
    5: { name: 'Leviathan', imageFilename: 'leviathan.png' },
  },
};

const getRaidBossName = (raidStage) => {
  let name = null;

  if (raidStage) {
    const { raid, boss, stage } = raidStage;

    if (raid && boss && stage) {
      const raidLookup = raidNamesLookup[raid];
      if (raidLookup) {
        const bossLookup = raidLookup[boss];
        if (bossLookup) {
          name = `${raid}.${stage} ${bossLookup.name}`;
        }
      }
    }
  }

  return name;
};

const getRaidColor = (raidStage) => {
  let color = null;

  if (raidStage) {
    const { raid } = raidStage;

    if (raid) {
      const raidLookup = raidNamesLookup[raid];
      // eslint-disable-next-line prefer-destructuring
      color = raidLookup.color;
    }
  }

  return color;
};

const getBossImageFilename = (raidStage) => {
  let filename = null;

  if (raidStage) {
    const { raid, boss } = raidStage;

    if (raid && boss) {
      const raidLookup = raidNamesLookup[raid];
      if (raidLookup) {
        const bossLookup = raidLookup[boss];
        if (bossLookup && bossLookup.imageFilename) {
          filename = `./assets/bosses/${bossLookup.imageFilename}`;
        }
      }
    }
  }

  return filename;
};

export const generateRaidProgressMessage = ({
  message,
  timestamp,
  kl,
  raidStage,
  damage,
  resist,
}) => {
  const messageData = {
    embed: {
      description: 'Thanks for recording your raid damage! This is the data I\'ve recorded',
      author: {
        name: `${message.member.displayName} (KL${kl})`,
        icon_url: message.author.avatar ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png` : undefined,
      },
      footer: {
        icon_url: 'https://cdn.discordapp.com/avatars/294466905073516554/07714791affb9af210756ce2565e6488.png',
        text: 'NephBot created by @stephenmesa#1219',
      },
      title: 'Raid Progress',
      color: getRaidColor(raidStage),
      timestamp: timestamp.toISOString(),
      fields: [
        {
          name: 'Boss',
          value: getRaidBossName(raidStage),
          inline: true,
        }, {
          name: 'Damage',
          value: damage,
          inline: true,
        }, {
          name: 'Resistance',
          value: resist,
          inline: true,
        },
      ],
    },
  };

  const bossImageFilename = getBossImageFilename(raidStage);

  if (bossImageFilename) {
    messageData.embed.image = {
      url: 'attachment://boss.png',
    };

    messageData.files = [new Discord.Attachment(bossImageFilename, 'boss.png')];
  }

  return messageData;
};
