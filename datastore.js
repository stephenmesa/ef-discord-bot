var Datastore = require('@google-cloud/datastore');

var projectId = process.env.DATASTORE_PROJECTID;

if (!projectId) {
    console.error('Must provide DATASTORE_PROJECTID environment variable!');
    process.exit(1);
}

var datastore = new Datastore({
  projectId: projectId,
});

var kind = 'Progress';

function saveProgress(kl, totalMedals, rate, percentage, userId, username, timestamp) {
    var progressKey = datastore.key(kind);

    var progress = {
      key: progressKey,
      data: {
        kl: kl,
        totalMedals: totalMedals,
        rate: rate,
        percentage: percentage,
        userId: userId,
        username: username,
        timestamp: timestamp,
      },
    };

    datastore
      .save(progress)
      .then(function() {
        console.log('Saved ' + progress.key.name + ': ' + progress.data.username);
      })
      .catch(function(err) {
        console.error('ERROR:', err);
      });
}

function getLatestProgress(userId) {
    var query = datastore.createQuery(kind)
      .filter('userId', '=', userId)
      .order('timestamp', { descending: true })
      .limit(1);

    return datastore.runQuery(query).then(function(results) {
        var latestProgress = results && results[0] && results[0][0];
        return latestProgress;
      });
}

module.exports = {
    saveProgress: saveProgress,
    getLatestProgress: getLatestProgress,
};