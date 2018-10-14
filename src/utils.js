import stats from 'stats-analysis';
import _ from 'lodash';

export const parseGoldString = (gold) => {
  if (Number.isFinite(gold)) {
    return Number(gold);
  }

  // make sure the string follows the template of {number}{letters}
  const efGoldFormatRegExp = new RegExp(/(^\d+\.?\d*)(\D?)$/);

  const matches = gold.match(efGoldFormatRegExp);
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
  return `Welcome back! You've gained ${klGained} KL and ${medalsGainedPercentage.toFixed(2).toString()}% total medals over the last ${hoursDiff.toFixed(2).toString()} hour(s)`;
};

export const generateSrMessage = (
  msg,
  timestamp,
  percentage,
  medalsGained,
  percentageWithDoubled,
  description,
) => ({
  embed: {
    description,
    author: {
      name: msg.member.displayName,
      icon_url: msg.author.avatar ? `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png` : undefined,
    },
    footer: {
      icon_url: 'https://cdn.discordapp.com/avatars/294466905073516554/dcde95b6bfc77a0a7eb62827fd87af1a.png',
      text: 'NephBot created by @stephenmesa#1219',
    },
    title: 'Spirit Rest Calculator',
    color: 13720519,
    timestamp: timestamp.toISOString(),
    fields: [{
      name: 'Spirit Rest',
      value: `${percentage.toFixed(2).toString()}% (${formatGoldString(medalsGained)})`,
      inline: true,
    },
    {
      name: 'Spirit Rest Doubled',
      value: `${percentageWithDoubled.toFixed(2).toString()}% (${formatGoldString(medalsGained * 2)})`,
      inline: true,
    },
    ],
  },
});

const filterOutlierProgresses = (records) => {
  const filteredRecords = records.filter(record => !!record.percentage);
  const percentages = filteredRecords.map(r => r.percentage);
  const outlierIndices = stats.indexOfOutliers(percentages, stats.outlierMethod.MAD, 60);

  return filteredRecords.filter((val, index) => outlierIndices.indexOf(index) === -1);
};

export const assessProgress = (currentProgress, comparableProgresses) => {
  const normalizedProgresses = filterOutlierProgresses(comparableProgresses);

  const klProgresses = _.groupBy(normalizedProgresses, 'kl');

  const kls = _.mapValues(klProgresses, (progresses) => {
    const percentages = progresses.map(e => e.percentage);
    const percentageAverage = stats.mean(percentages);
    const percentageMin = Math.min(...percentages);
    const percentageMax = Math.max(...percentages);
    const n = progresses.length;

    return {
      percentageAverage: Number(percentageAverage.toFixed(2)),
      n,
      percentageMin: Number(percentageMin.toFixed(2)),
      percentageMax: Number(percentageMax.toFixed(2)),
    };
  });

  const allPercentageMins = _.map(_.values(kls), data => _.get(data, 'percentageMin'));
  const overallPercentageMin = Math.min(...allPercentageMins);

  const allPercentageMaxs = _.map(_.values(kls), data => _.get(data, 'percentageMax'));
  const overallPercentageMax = Math.max(...allPercentageMaxs);

  const allPercentageAverages = _.map(_.values(kls), data => _.get(data, 'percentageAverage'));
  const overallPercentageAverage = stats.mean(allPercentageAverages);

  const overallPercentageRange = overallPercentageMax - overallPercentageMin;
  const scoreDecimal = (currentProgress.percentage - overallPercentageMin) / overallPercentageRange;
  const score = Math.round(scoreDecimal * 100);

  return {
    kls,
    percentageAverage: Number(overallPercentageAverage.toFixed(2)),
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
    name: `KL${groupKL} (${klAssessment.n} records)`,
    value: `${klAssessment.percentageMin}%-${klAssessment.percentageMax}%`,
    inline: true,
  })));

  const description = `Your SR grade is **${assessment.score}/100**. (Based on an average percentage of ${assessment.percentageAverage}%)`;

  return {
    embed: {
      description,
      author: {
        name: `${message.member.displayName} (KL${kl} ${percentage.toFixed(2)}%)`,
        icon_url: message.author.avatar ? `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png` : undefined,
      },
      footer: {
        icon_url: 'https://cdn.discordapp.com/avatars/294466905073516554/dcde95b6bfc77a0a7eb62827fd87af1a.png',
        text: 'NephBot created by @stephenmesa#1219',
      },
      title: 'SR Grade',
      color: 13720519,
      timestamp: timestamp.toISOString(),
      fields: klFields,
    },
  };
};
