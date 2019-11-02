import fs from 'fs';
import uuidv4 from 'uuid/v4';

const tempDir = './temp';
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

export const generateSRCSV = (entries) => {
  const filename = `${tempDir}/sr-history-${uuidv4()}.csv`;
  const entriesMessages = entries.map(p => [p.id, p.timestamp, p.kl, p.totalMedals, p.rate, p.percentage].map(v => `"${v}"`).join(','));
  const csvContents = `"id","timestamp","kl","totalMedals","srRate","srPercentage"
${entriesMessages.join('\n')}`;
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, csvContents, (err) => {
      if (err) reject(err);
      else resolve(filename);
    });
  });
};

export const generateRaidCSV = (entries) => {
  const filename = `${tempDir}/raid-history-${uuidv4()}.csv`;
  const entriesMessages = entries.map(p => [p.id, p.timestamp, p.kl, p.raidStageString, p.resist, p.damage].map(v => `"${v}"`).join(','));
  const csvContents = `"id","timestamp","kl","raidStageString","resist","damage"
${entriesMessages.join('\n')}`;
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, csvContents, (err) => {
      if (err) reject(err);
      else resolve(filename);
    });
  });
};

export const deleteCSV = (filename) => {
  fs.unlink(filename, (err) => {
    if (err) {
      console.error(`failed to delete csv: ${err}`);
    }
  });
};
