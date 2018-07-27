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

function getLatestProgressEntry(userId) {
  var query = datastore.createQuery(kind)
      .filter('userId', '=', userId)
      .order('timestamp', { descending: true })
      .limit(1);

  return datastore.runQuery(query);
}

function getLatestProgress(userId) {
  return getLatestProgressEntry(userId).then(function(results) {
    var latestProgress = results && results[0] && results[0][0];
    return latestProgress;
  });
}

function deleteLatestProgress(userId) {
  return getLatestProgressEntry(userId).then(function(results) {
    var progressEntry = results && results[0] && results[0][0];
    var itemKey = progressEntry && progressEntry[datastore.KEY];
    if (!itemKey) {
      throw {
        message: 'No latest progress item found for userId: ' + userId,
        errorCode: 404,
      };
    }

    return datastore.delete(itemKey).then(function() {
      return {
        deletedEntry: progressEntry,
      };
    });
  });
}

module.exports = {
  saveProgress: saveProgress,
  getLatestProgress: getLatestProgress,
  deleteLatestProgress: deleteLatestProgress,
};