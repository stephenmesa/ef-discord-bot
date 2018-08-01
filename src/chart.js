import fs from 'fs';
import uuidv4 from 'uuid/v4';

import { anychart, anychartExport } from './bootstrapAnychart';

const tempDir = './temp';
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

export const generateKLSparklineChart = rawData => new Promise((resolve, reject) => {
  const sortedRawData = rawData.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
  const klData = sortedRawData.map(d => [d.timestamp, d.kl]);
  const stage = anychart.graphics.create('container');
  const chart = anychart.sparkline();
  chart.container(stage);
  chart.data(klData);
  chart.bounds(0, 0, 200, 30);
  chart.seriesType('column');
  chart.draw();

  const filename = `${tempDir}/kl-${uuidv4()}.jpg`;

  anychartExport.exportTo(chart, 'jpg').then((image) => {
    fs.writeFile(filename, image, (fsWriteError) => {
      if (fsWriteError) {
        reject(fsWriteError);
      } else {
        resolve(filename);
      }
    });
  }, (generationError) => {
    reject(generationError);
  });
});

export const generateTotalMedalsSparklineChart = rawData => new Promise((resolve, reject) => {
  const sortedRawData = rawData.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
  const klData = sortedRawData.map(d => [d.timestamp, d.totalMedals]);
  const stage = anychart.graphics.create('container');
  const chart = anychart.sparkline();
  chart.container(stage);
  chart.data(klData);
  chart.bounds(0, 0, 200, 30);
  chart.seriesType('column');
  chart.draw();

  const filename = `${tempDir}/medals-${uuidv4()}.jpg`;

  anychartExport.exportTo(chart, 'jpg').then((image) => {
    fs.writeFile(filename, image, (fsWriteError) => {
      if (fsWriteError) {
        reject(fsWriteError);
      } else {
        resolve(filename);
      }
    });
  }, (generationError) => {
    reject(generationError);
  });
});

export const deleteChart = (filename) => {
  fs.unlink(filename);
};
