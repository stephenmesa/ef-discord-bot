import * as utils from '../utils';
import * as datastore from '../datastore';
import * as csv from '../csv';
import * as chart from '../chart';
var Bot = require('../index').Bot;
var _ = require('lodash');

module.exports = {
	commands:
	[{
		name: 'graph',
		description: 'Graphs your progress',
		usage: '[kl/medals] (blank for both)'
		cooldown: 10,
		guildOnly: true,
		async execute(message, args) {
			datastore.getAllProgressEntries(message.author.id)
			.then((results) => {
				var tempchart, description;
				if(args[0] && args[0].toLowerCase() == "kl")
				{
					const dataPoints = results.map(p => ({
						kl: Number(p.kl),
						totalMedals: utils.parseGoldString(p.totalMedals),
						timestamp: p.timestamp,
					}));
					chart.generateKlChart(dataPoints).then((chartFilename) => {
						tempchart = chartFilename;
						description = 'KL';
					});
				}
				else if(args[0] && args[0].toLowerCase() == "medals")
				{
					const dataPoints = results.map(p => ({
						kl: Number(p.kl),
						totalMedals: utils.parseGoldString(p.totalMedals),
						timestamp: p.timestamp,
					}));
					chart.generateMedalsChart(dataPoints).then((chartFilename) => {
						tempchart = chartFilename;
						description = 'medal';
					});
				}
				else
				{
					const dataPoints = results.map(p => ({
						kl: Number(p.kl),
						totalMedals: utils.parseGoldString(p.totalMedals),
						srRate: p.percentage,
						timestamp: p.timestamp,
					}));
					chart.generateKLAndMedalsChart(dataPoints).then((chartFilename) => {
						tempchart = chartFilename;
						description = 'KL and medal';
					});
				}
				const re = new Discord.RichEmbed()
				.setAuthor(message.member.displayName, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`)
				.setColor(13720519)
				.setFooter('NephBot created by @stephenmesa#1219', 'https://cdn.discordapp.com/avatars/294466905073516554/dcde95b6bfc77a0a7eb62827fd87af1a.png')
				.setImage('attachment://chart.jpg')
				.attachFile(new Discord.Attachment(tempchart, 'chart.jpg'))
				.setDescription(`Here's your recent progress on ${description} gain!`);
				message.channel.send(re).then(() => {
					chart.deleteChart(tempchart);
				});
			});
		},
	}]
};
