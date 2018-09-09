import fs from 'fs';
import uuidv4 from 'uuid/v4';

const tempDir = './temp';
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

export const generateProgressCSV = (progress) => {
  const filename = `${tempDir}/kl-medals-${uuidv4()}.jpg`;
  const progressMessages = progress.map(p => [p.id, p.timestamp, p.kl, p.totalMedals, p.rate, p.percentage].map(v => `"${v}"`).join(','));
  const csvContents = `"id","timestamp","kl","totalMedals","srRate","srPercentage"
${progressMessages.join('\n')}`;
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
