import Discord from 'discord.js';
import * as utils from '../utils';
import * as datastore from '../datastore';
import * as chart from '../chart';

const sendGraphMessage = ({
  message,
  chartFilename,
  chartType,
}) => {
  const re = new Discord.RichEmbed()
    .setAuthor(message.member.displayName, message.author.avatar ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png` : undefined)
    .setColor(13720519)
    .setFooter('NephBot created by @stephenmesa#1219', 'https://cdn.discordapp.com/avatars/294466905073516554/dcde95b6bfc77a0a7eb62827fd87af1a.png')
    .setImage('attachment://chart.jpg')
    .attachFile(new Discord.Attachment(chartFilename, 'chart.jpg'))
    .setDescription(`Here's your recent progress on ${chartType} gain!`);
  message.channel.send(re).then(() => {
    chart.deleteChart(chartFilename);
  });
};

const graphCommand = {
  name: 'graph',
  description: 'Graphs your progress',
  usage: '[kl/medals] (blank for both)',
  execute: (message, args) => {
    datastore.getAllProgressEntries(message.author.id)
      .then((results) => {
        const dataPoints = results.map(p => ({
          kl: Number(p.kl),
          totalMedals: utils.parseGoldString(p.totalMedals),
          srRate: p.percentage,
          timestamp: p.timestamp,
        }));

        const graphType = args[0] ? args[0].toLowerCase() : args[0];

        if (graphType === 'kl') {
          chart.generateKlChart(dataPoints).then((chartFilename) => {
            sendGraphMessage({
              message,
              chartFilename,
              chartType: 'KL',
            });
          });
        } else if (graphType === 'medals') {
          chart.generateMedalsChart(dataPoints).then((chartFilename) => {
            sendGraphMessage({
              message,
              chartFilename,
              chartType: 'medal',
            });
          });
        } else {
          chart.generateKLAndMedalsChart(dataPoints).then((chartFilename) => {
            sendGraphMessage({
              message,
              chartFilename,
              chartType: 'KL and medal',
            });
          });
        }
      });
  },
};

export default [
  graphCommand,
];
