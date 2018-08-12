import * as utils from '../utils';
import * as datastore from '../datastore';
import * as csv from '../csv';
var Bot = require('../index').Bot;
var _ = require('lodash');

module.exports = {
	commands:
	[{
		name: 'record',
		description: 'Record your progress',
		cooldown: 10,
		args: 1,
		aliases: ['sr'],
		usage: '<knight level> <total medals> <SR mpm> [SR multiplier(assumed 1.05 if blank)]',
		async execute(message, args) {
			if(args[0].toLowerCase() == 'undo'){
				return message.reply(`This command has been split, please use "${Bot.prefix}undo" instead`);
			}
			else if(args[0].toLowerCase() == 'delete' ){
				return message.reply(`This command has been split, please use "${Bot.prefix}delete" instead`);
			}
			else if(args[0].toLowerCase() == 'history'){
				return message.reply(`This command has been split, please use "${Bot.prefix}history" instead`);
			}
			if(args.length < 3)
			{
				let reply = `You didn't provide enough arguments, ${message.author}!`;
				reply += `\nThe proper usage would be: \`${Bot.prefix}record <knight level> <total medals> <SR mpm> [SR multiplier(assumed 1.05 if blank)]\``;
				return message.channel.send(reply);
			}
			else {
				var kl, totalMdl, srMpm, srEfficiency;
				if(isNaN(kl = args[0]))
				{
					return message.reply('Invalid knight level provided, please ensure you only use numbers');
				}
				if((totalMdl = utils.parseGoldString(args[1])) == null)
				{
					return message.reply('Invalid total medals supplied, please try again');
				}
				if((srMpm = utils.parseGoldString(args[2])) == null)
				{
					return message.reply('Invalid SR MPM supplied, please try again');
				}
				if(isNaN(srEfficiency = args[3] || 1.05))
				{
					return message.reply('Invalid SR efficiency supplied, please try again');
				}
				const totalMinutes = 4 * 60;
				const medalsGained = srMpm * totalMinutes * srEfficiency;
				
				const percentage = (medalsGained / totalMdl) * 100;
				const percentageWithDoubled = ((medalsGained * 2) / total) * 100;
				
				datastore.getLatestProgress(message.author.id).then((latestProgress) => {
					let description;
					if (latestProgress) {
						description = utils.generateProgressChangeSummary(kl, totalMdl, latestProgress);
					} else {
						description = 'Hello! Thanks for recording your progress. I will keep track of your progress and let you know how you\'re doing over time';
					}
					const messageToSend = utils.generateSrMessage(
						message,
						new Date(),
						percentage,
						medalsGained,
						percentageWithDoubled,
						description,
					);
					msg.channel.send(messageToSend);
					
					datastore.saveProgress(kl, totalMdl, srMpm, percentage, message.author.id, message.author, new Date());
				});
			}
		},
	},
	{
		name: 'undo',
		description: 'Undo your last recorded progress',
		cooldown: 10,
		async execute(message, args) {
			datastore.deleteLatestProgress(message.author.id)
			.then((result) => {
				const deletedProgress = result.deletedEntry;
				const hoursDiff = utils.getHoursSince(deletedProgress.timestamp);
				message.reply(`Deleted previous record of ${deletedProgress.kl} KL and ${deletedProgress.totalMedals} total medals, recorded ${hoursDiff.toFixed(2).toString()} hours ago`);
			})
			.catch((err) => {
				if (err.errorCode === 404) {
					message.reply('Sorry, I couldn\'t find your most recent SR progress, it doesn\'t appear that you have any.');
				} else {
					console.error(err);
					massage.reply('Looks like stephenmesa has a terrible bug in his code. Go make fun of his programming abilities!');
				}
			});
		},
	},
	{
		name: 'history',
		description: 'View your progress history',
		cooldown: 10,
		async execute(message, args) {
			datastore.getAllProgressEntries(message.author.id, 512).then((progress) => {
				if (!progress || progress.length === 0) {
					return message.author.send(`Sorry, I don't have any progress recorded for you. Try using the '${Bot.prefix}record' command to record progress!`);
				}
				csv.generateProgressCSV(progress)
				.then((filename) => {
					const re = new Discord.RichEmbed()
					.attachFile(new Discord.Attachment(filename, 'progress.csv'))
					.setDescription('Here\'s your progress to date!');
					
					message.author.send(re).then(() => {
						csv.deleteCSV(filename);
					});
				});
			});
		},
	},
	{
		name: 'delete',
		description: 'Delete a record from your progress',
		usage: `<ID (use ${Bot.prefix}history to see IDs)>`,
		args: 1,
		cooldown: 5,
		async execute(message, args) {
			var id;
			if(isNaN(id = args[0]))
			{
				return message.reply('Invalid ID supplied, please only use numbers');
			}
			datastore.deleteProgress(message.author.id, id)
			.then((result) => {
				const deletedProgress = result.deletedEntry;
				const hoursDiff = utils.getHoursSince(deletedProgress.timestamp);
				message.reply(`Deleted previous record of ${deletedProgress.kl} KL and ${deletedProgress.totalMedals} total medals, recorded ${hoursDiff.toFixed(2).toString()} hours ago`);
			})
			.catch((err) => {
				if (err.errorCode === 404) {
					message.reply(`Sorry, I couldn't find a progress entry with the id of ${id}.`);
				} else {
					console.error(err);
					message.reply('Looks like stephenmesa has yet another terrible bug in his code. Go make fun of his programming abilities!');
				}
			});
		}
	}]
};

