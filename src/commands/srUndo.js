var datastore = require('../datastore');

function srUndo(msg) {
    var userId = msg.author.id;
    datastore.deleteLatestProgress(userId)
      .then(function(result) {
        var deletedProgress = result.deletedEntry;
        var now = new Date();
        var hoursDiff = (now.getTime() - deletedProgress.timestamp.getTime())/(1000*60*60);
        msg.reply('deleted previous record of ' + deletedProgress.kl + ' KL and ' + deletedProgress.totalMedals + ' total medals, recorded ' + hoursDiff.toFixed(2).toString() + ' hours ago');
      })
      .catch(function(err) {
        if (err.errorCode === 404) {
          msg.reply('Sorry, I couldn\'t find your most recent SR progress, it doesn\'t appear that you have any.');
        } else {
          console.error(err);
          msg.reply('Looks like stephenmesa has a terrible bug in his code. Go make fun of his programming abilities!');
        }
      });
  }

module.exports = srUndo;
