import Discord from 'discord.js';

import * as utils from '../utils';
import * as datastore from '../datastore';
import * as chart from '../chart';

const srGraph = (msg) => {
  const userId = msg.author.id;
  datastore.getAllProgressEntries(userId)
    .then((results) => {
      const dataPoints = results.map(p => ({
        kl: Number(p.kl),
        totalMedals: utils.parseGoldString(p.totalMedals),
        timestamp: p.timestamp,
      }));

      const klChart = chart.generateKLSparklineChart(dataPoints);
      const medalsChart = chart.generateTotalMedalsSparklineChart(dataPoints);

      Promise.all([klChart, medalsChart]).then((chartResults) => {
        const [klFilename, medalsFilename] = chartResults;

        const re = new Discord.RichEmbed()
          .addBlankField(true)
          .attachFile(new Discord.Attachment(klFilename, 'kl-sparkline.jpg'))
          .setAuthor(msg.member.displayName, `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png`)
          .setColor(13720519)
          .setDescription('testing')
          .setFooter('NephBot created by @stephenmesa#1219', 'https://cdn.discordapp.com/avatars/294466905073516554/dcde95b6bfc77a0a7eb62827fd87af1a.png')
          .setImage('attachment://kl-sparkline.jpg');

        msg.channel.send(re).then(() => {
          chart.deleteChart(klFilename);
          chart.deleteChart(medalsFilename);
        });

        // msg.channel.send({
        //   embed: {
        //     description: 'testing',
        //     author: {
        //       name: msg.member.displayName,
        //       icon_url: `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png`,
        //     },
        //     footer: {
        //       icon_url: 'https://cdn.discordapp.com/avatars/294466905073516554/dcde95b6bfc77a0a7eb62827fd87af1a.png',
        //       text: 'NephBot created by @stephenmesa#1219',
        //     },
        //     title: 'Spirit Rest Calculator',
        //     color: 13720519,
        //     timestamp: (new Date()).toISOString(),
        //     fields: [{
        //       name: 'Spirit Rest',
        //       value: 'temp',
        //       inline: true,
        //     },
        //     {
        //       name: 'Spirit Rest Doubled',
        //       value: 'temp2',
        //       inline: true,
        //     },
        //     ],
        //     thumbnail: {
        //       url: 'attachment://medals-sparkline.jpg',
        //     },
        //     image: {
        //       url: 'attachment://kl-sparkline.jpg',
        //     },
        //   },
        //   files: [
        //     {
        //       attachment: klFilename,
        //       name: 'kl-sparkline.jpg',
        //     },
        //     {
        //       attachment: medalsFilename,
        //       name: 'medals-sparkline.jpg',
        //     },
        //   ],
        // }).then(() => {
        //   chart.deleteChart(klFilename);
        //   chart.deleteChart(medalsFilename);
        // });
      });
    });
};

export default srGraph;
