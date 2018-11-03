import fs from 'fs';
import uuidv4 from 'uuid/v4';

const tempDir = './temp';
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

export const generateTxt = (text) => {
  const filename = `${tempDir}/text-${uuidv4()}.txt`;

  return new Promise((resolve, reject) => {
    fs.writeFile(filename, text, (err) => {
      if (err) reject(err);
      else resolve(filename);
    });
  });
};

export const deleteTxt = (filename) => {
  fs.unlink(filename, (err) => {
    if (err) {
      console.error(`failed to delete txt: ${err}`);
    }
  });
};
