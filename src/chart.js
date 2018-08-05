import fs from 'fs';
import uuidv4 from 'uuid/v4';

import { anychart, anychartExport } from './bootstrapAnychart';
import * as utils from './utils';

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

export const generateSrChart = rawData => new Promise((resolve, reject) => {
  const sortedRawData = rawData.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
  const klData = sortedRawData.map(d => [d.timestamp, d.kl]);
  const stage = anychart.graphics.create('container');
  const chart = anychart.line();
  const series = chart.line(klData);
  chart.container(stage);
  chart.bounds(0, 0, 800, 600);
  chart.title('KL Progression');

  const dateTimeScale = anychart.scales.dateTime();
  const dateTimeTicks = dateTimeScale.ticks();
  dateTimeTicks.interval('d', 1);
  chart.xScale(dateTimeScale);
  chart.xAxis({ ticks: true }).labels();
  chart.yAxis().title('KL');
  series.name('KL');
  series.labels(true);
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

export const generateMedalsChart = rawData => new Promise((resolve, reject) => {
  const sortedRawData = rawData.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
  const medalData = sortedRawData.map(d => [d.timestamp, d.totalMedals]);
  const stage = anychart.graphics.create('container');
  const chart = anychart.line();
  const series = chart.line(medalData);
  chart.container(stage);
  chart.bounds(0, 0, 800, 600);
  chart.title('Medal Progression');

  const dateTimeScale = anychart.scales.dateTime();
  const dateTimeTicks = dateTimeScale.ticks();
  dateTimeTicks.interval('d', 1);
  chart.xScale(dateTimeScale);
  chart.xAxis({ ticks: true }).labels();
  chart.yAxis().title('Medals').labels().format(function () {
    const { value } = this;
    return utils.formatGoldString(value);
  });

  series.name('Medals');
  series.labels(true);
  series.labels().format(function () {
    const { value } = this;
    return utils.formatGoldString(value);
  });
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
