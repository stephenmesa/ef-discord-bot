var utils = require("./utils");

function generateSrMessage(msg, timestamp, percentage, medalsGained, percentageWithDoubled, description) {
    return {
        embed:
        {
            description: description,
            author: {
                name: msg.member.displayName,
                icon_url: 'https://cdn.discordapp.com/avatars/' + msg.author.id + '/' + msg.author.avatar + '.png'
            },
            footer: {
                icon_url: "https://cdn.discordapp.com/avatars/294466905073516554/dcde95b6bfc77a0a7eb62827fd87af1a.png",
                text: "NephBot created by @stephenmesa#1219"
            },
            title: "Spirit Rest Calculator",
            color: 13720519,
            timestamp: timestamp.toISOString(),
            fields: [
                {
                    name: "Spirit Rest",
                    value: percentage.toFixed(2).toString() + '% (' + utils.formatGoldString(medalsGained) + ')',
                    inline: true
                },
                {
                    name: "Spirit Rest Doubled",
                    value: percentageWithDoubled.toFixed(2).toString() + '% (' + utils.formatGoldString(medalsGained * 2) + ')',
                    inline: true
                }
            ]
        }
    };
}

module.exports = {
    generateSrMessage: generateSrMessage,
};
