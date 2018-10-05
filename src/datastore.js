import Datastore from '@google-cloud/datastore';
import _ from 'lodash';

import CustomError from './classes/CustomError';

const projectId = process.env.DATASTORE_PROJECTID;

if (!projectId) {
  console.error('Must provide DATASTORE_PROJECTID environment variable!');
  process.exit(1);
}

const datastore = new Datastore({
  projectId,
});

const kind = 'Progress';

export const saveProgress = (kl, totalMedals, rate, percentage, userId, username, timestamp) => {
  const progressKey = datastore.key(kind);

  const progress = {
    key: progressKey,
    data: {
      kl,
      totalMedals,
      rate,
      percentage,
      userId,
      username,
      timestamp,
    },
  };

  datastore
    .save(progress)
    .catch((err) => {
      console.error('ERROR:', err);
    });
};

const getLatestProgressEntry = (userId) => {
  const query = datastore.createQuery(kind)
    .filter('userId', '=', userId)
    .order('timestamp', { descending: true })
    .limit(1);

  return datastore.runQuery(query);
};

export const getAllProgressEntries = (userId, limit = 25) => {
  const query = datastore.createQuery(kind)
    .filter('userId', '=', userId)
    .order('timestamp', { descending: true })
    .limit(limit);

  return datastore.runQuery(query)
    .then(results => results[0].map((r) => {
      const id = _.get(r[datastore.KEY], 'id');
      return { ...r, id };
    }));
};

export const getProgressEntry = (userId, id) => {
  const key = datastore.key([kind, Number(id)]);
  const query = datastore.createQuery(kind)
    .filter('__key__', key)
    .filter('userId', '=', userId);

  return datastore.runQuery(query);
};

export const getLatestProgress = userId => getLatestProgressEntry(userId).then((results) => {
  const latestProgress = results && results[0] && results[0][0];
  return latestProgress;
});

export const deleteLatestProgress = userId => getLatestProgressEntry(userId).then((results) => {
  const progressEntry = results && results[0] && results[0][0];
  const itemKey = progressEntry && progressEntry[datastore.KEY];
  if (!itemKey) {
    throw new CustomError(`No latest progress item found for userId: ${userId}`, 404);
  }

  return datastore.delete(itemKey).then(() => ({
    deletedEntry: progressEntry,
  }));
});

export const deleteProgress = (userId, id) => getProgressEntry(userId, id).then((results) => {
  const progressEntry = results && results[0] && results[0][0];
  const itemKey = progressEntry && progressEntry[datastore.KEY];
  if (!itemKey) {
    throw new CustomError(`No progress item found for id: ${id}`, 404);
  }

  return datastore.delete(itemKey).then(() => ({
    deletedEntry: progressEntry,
  }));
});

export const getAllProgressEntriesForKL = (kl, limit = 25) => {
  const query = datastore.createQuery(kind)
    .filter('kl', '=', kl)
    .order('timestamp', { descending: true })
    .limit(limit);

  return datastore.runQuery(query)
    .then(results => results[0].map((r) => {
      const id = _.get(r[datastore.KEY], 'id');
      return { ...r, id };
    }));
};
