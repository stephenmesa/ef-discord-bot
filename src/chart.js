import fs from 'fs';
import uuidv4 from 'uuid/v4';
import _ from 'lodash';

import { anychart, anychartExport } from './bootstrapAnychart';
import * as utils from './utils';

const tempDir = './temp';
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

const exportChartToFilename = (chart, filename) => new Promise((resolve, reject) => anychartExport.exportTo(chart, 'png')
  .then(async (pngBuffer) => {
    fs.writeFile(filename, pngBuffer, (fsWriteError) => {
      if (fsWriteError) {
        reject(fsWriteError);
      } else {
        resolve(filename);
      }
    });
  }));

export const generateKLSparklineChart = (rawData) => {
  const sortedRawData = rawData.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
  const klData = sortedRawData.map(d => [d.timestamp, d.kl]);
  const stage = anychart.graphics.create('container');
  const chart = anychart.sparkline();
  chart.container(stage);
  chart.data(klData);
  chart.bounds(0, 0, 200, 30);
  chart.seriesType('column');
  chart.draw();

  const filename = `${tempDir}/kl-${uuidv4()}.png`;

  return exportChartToFilename(chart, filename);
};

export const generateTotalMedalsSparklineChart = (rawData) => {
  const sortedRawData = rawData.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
  const klData = sortedRawData.map(d => [d.timestamp, d.totalMedals]);
  const stage = anychart.graphics.create('container');
  const chart = anychart.sparkline();
  chart.container(stage);
  chart.data(klData);
  chart.bounds(0, 0, 200, 30);
  chart.seriesType('column');
  chart.draw();

  const filename = `${tempDir}/medals-${uuidv4()}.png`;

  return exportChartToFilename(chart, filename);
};

export const generateKlChart = (rawData) => {
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

  const filename = `${tempDir}/kl-${uuidv4()}.png`;

  return exportChartToFilename(chart, filename);
};

export const generateMedalsChart = (rawData) => {
  const sortedRawData = rawData.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
  const medalData = sortedRawData.map(d => [d.timestamp, d.totalMedals]);
  const stage = anychart.graphics.create('container');
  const chart = anychart.line();
  const series = chart.line(medalData);
  chart.container(stage);
  chart.bounds(0, 0, 800, 600);
  chart.title('Medal Progression');

  const yScale = anychart.scales.log();
  const maxMedals = _.max(sortedRawData.map(d => d.totalMedals));
  const minMedals = _.min(sortedRawData.map(d => d.totalMedals));
  yScale.maximum(maxMedals * 1.05);
  yScale.minimum(minMedals * 0.95);

  const dateTimeScale = anychart.scales.dateTime();
  const dateTimeTicks = dateTimeScale.ticks();
  dateTimeTicks.interval('d', 1);
  chart.xScale(dateTimeScale);
  chart.xAxis({ ticks: true }).labels();
  chart
    .yAxis()
    .scale(yScale)
    .title('Medals')
    .labels()
    .format((labelData) => {
      const { value } = labelData;
      return utils.formatGoldString(value);
    });

  series.name('Medals');
  series.labels(true);
  series.labels().format((labelData) => {
    const { value } = labelData;
    return utils.formatGoldString(value);
  });
  series.yScale(yScale);
  chart.draw();

  const filename = `${tempDir}/medals-${uuidv4()}.png`;

  return exportChartToFilename(chart, filename);
};

export const generateKLAndMedalsChart = (rawData) => {
  const sortedRawData = rawData.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
  const data = anychart.data.set(
    sortedRawData.map(d => [d.timestamp, d.kl, d.totalMedals]),
  );

  // map the data
  const seriesData1 = data.mapAs({ x: 0, value: 1 }); // kl
  const seriesData2 = data.mapAs({ x: 0, value: 2 }); // totalMedals

  const klTextColor = '#0570b0';
  const klColor = '#74a9cf';

  const medalsTextColor = '#cb181d';
  const medalsColor = '#fb6a4a';

  const chart = anychart.line();
  chart.legend().enabled(true);

  const yScale1 = anychart.scales.linear();
  const yScale2 = anychart.scales.log();
  const maxMedals = _.max(sortedRawData.map(d => d.totalMedals));
  const minMedals = _.min(sortedRawData.map(d => d.totalMedals));
  yScale2.maximum(maxMedals * 1.05);
  yScale2.minimum(minMedals * 0.95);

  const xAxis = chart.xAxis({ ticks: true });
  xAxis.title('Progress');
  xAxis.labels(true);

  const yAxis1 = chart.yAxis(0);
  yAxis1.scale(yScale1);
  yAxis1.title('KL');
  yAxis1.labels().fontColor(klTextColor);

  const yAxis2 = chart.yAxis(1);
  yAxis2.orientation('right');
  yAxis2.scale(yScale2);
  yAxis2.title('Medals');
  yAxis2.labels(true);
  yAxis2.labels().format((labelData) => {
    const { value } = labelData;
    return utils.formatGoldString(value);
  });
  yAxis2.labels().fontColor(medalsTextColor);

  const series1 = chart.line(seriesData1);
  series1.name('KL');
  series1.normal().stroke(klColor);
  series1.labels().fontColor(klTextColor);

  const series2 = chart.line(seriesData2);
  series2.name('Medals');
  series2.labels().format((labelData) => {
    const { value } = labelData;
    return utils.formatGoldString(value);
  });
  series2.normal().stroke(medalsColor);
  series2.labels().fontColor(medalsTextColor);

  series1.yScale(yScale1);
  series2.yScale(yScale2);

  const dateTimeScale = anychart.scales.dateTime();
  const dateTimeTicks = dateTimeScale.ticks();
  dateTimeTicks.interval('d', 1);
  chart.xScale(dateTimeScale);

  chart.title('Progress');

  chart.container('container');

  chart.bounds(0, 0, 800, 600);

  chart.draw();

  const filename = `${tempDir}/kl-medals-${uuidv4()}.png`;

  return exportChartToFilename(chart, filename);
};

export const deleteChart = (filename) => {
  fs.unlink(filename, (err) => {
    if (err) {
      console.error(`failed to delete chart: ${err}`);
    }
  });
};
