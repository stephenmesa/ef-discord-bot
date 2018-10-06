import stats from 'stats-analysis';

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
  const percentages = records.map(r => r.percentage);
  const outlierIndices = stats.indexOfOutliers(percentages, stats.outlierMethod.MAD, 60);

  return records.filter((val, index) => outlierIndices.indexOf(index) === -1);
};

export const assessProgress = (currentProgress, comparableProgresses) => {
  const normalizedProgresses = filterOutlierProgresses(comparableProgresses);
  const percentages = normalizedProgresses.map(e => e.percentage);
  const percentageAverage = stats.mean(percentages);
  const percentageIsGood = currentProgress.percentage >= percentageAverage;
  const percentageMin = Math.min(...percentages);
  const percentageMax = Math.max(...percentages);
  const percentageRange = percentageMax - percentageMin;
  const scoreDecimal = (currentProgress.percentage - percentageMin) / percentageRange;
  const score = Math.round(scoreDecimal * 100);
  const n = normalizedProgresses.length;

  return {
    percentageIsGood,
    percentageAverage,
    score,
    n,
  };
};
