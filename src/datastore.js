import Datastore from '@google-cloud/datastore';

const projectId = process.env.DATASTORE_PROJECTID;

if (!projectId) {
  console.error('Must provide DATASTORE_PROJECTID environment variable!');
  process.exit(1);
}

const datastore = new Datastore({
  projectId: projectId,
});

const kind = 'Progress';

export const saveProgress = (kl, totalMedals, rate, percentage, userId, username, timestamp) => {
  const progressKey = datastore.key(kind);

  const progress = {
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
    .then(() => {
      console.log('Saved ' + progress.key.name + ': ' + progress.data.username);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
}

const getLatestProgressEntry = (userId) => {
  const query = datastore.createQuery(kind)
      .filter('userId', '=', userId)
      .order('timestamp', { descending: true })
      .limit(1);

  return datastore.runQuery(query);
}

export const getLatestProgress = (userId) => {
  return getLatestProgressEntry(userId).then((results) => {
    const latestProgress = results && results[0] && results[0][0];
    return latestProgress;
  });
}

export const deleteLatestProgress = (userId) => {
  return getLatestProgressEntry(userId).then((results) => {
    const progressEntry = results && results[0] && results[0][0];
    const itemKey = progressEntry && progressEntry[datastore.KEY];
    if (!itemKey) {
      throw {
        message: 'No latest progress item found for userId: ' + userId,
        errorCode: 404,
      };
    }

    return datastore.delete(itemKey).then(() => {
      return {
        deletedEntry: progressEntry,
      };
    });
  });
}
