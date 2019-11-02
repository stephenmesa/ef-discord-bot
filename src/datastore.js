import { Datastore } from '@google-cloud/datastore';
import _ from 'lodash';

import CustomError from './classes/CustomError';

const projectId = process.env.DATASTORE_PROJECTID;
const { SPONSOR_ENTITY_ID } = process.env;

if (!projectId) {
  console.error('Must provide DATASTORE_PROJECTID environment variable!');
  process.exit(1);
}

const datastore = new Datastore({
  projectId,
});

const kind = 'Progress';
const raidProgressKind = 'RaidProgress';

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

  return datastore
    .save(progress)
    .catch((err) => {
      console.error('Error saving progress datastore entity:', err);
    });
};

const getLatestEntry = entryKind => (userId) => {
  const query = datastore.createQuery(entryKind)
    .filter('userId', '=', userId)
    .order('timestamp', { descending: true })
    .limit(1);

  return datastore.runQuery(query);
};

const getLatestSREntry = getLatestEntry(kind);

const getLatestRaidEntry = getLatestEntry(raidProgressKind);

const getAllEntries = entryKind => (userId, limit = 25) => {
  const query = datastore.createQuery(entryKind)
    .filter('userId', '=', userId)
    .order('timestamp', { descending: true })
    .limit(limit);

  return datastore.runQuery(query)
    .then(results => results[0].map((r) => {
      const id = _.get(r[datastore.KEY], 'id');
      return { ...r, id };
    }));
};

export const getAllSREntries = getAllEntries(kind);

export const getAllRaidEntries = getAllEntries(raidProgressKind);

export const getRaidEntriesForStage = (raidStage, userId, limit = 25) => {
  const query = datastore.createQuery(raidProgressKind)
    .filter('userId', '=', userId)
    .filter('bossNumber', '=', raidStage.boss)
    .filter('stageNumber', '=', raidStage.stage)
    .filter('raidNumber', '=', raidStage.raid)
    .order('timestamp', { descending: true })
    .limit(limit);

  return datastore.runQuery(query)
    .then(results => results[0].map((r) => {
      const id = _.get(r[datastore.KEY], 'id');
      return { ...r, id };
    }));
};

export const getRecentRecordCounts = () => {
  const yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
  const lastWeek = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));

  const lastDayQuery = datastore.runQuery(
    datastore.createQuery(kind)
      .filter('timestamp', '>', yesterday)
      .select('__key__'),
  ).then(results => results[0].length);

  const lastWeekQuery = datastore.runQuery(
    datastore.createQuery(kind)
      .filter('timestamp', '>', lastWeek)
      .select('__key__'),
  ).then(results => results[0].length);

  return Promise.all([lastDayQuery, lastWeekQuery]);
};

const getEntry = entryKind => (userId, id) => {
  const key = datastore.key([entryKind, Number(id)]);
  const query = datastore.createQuery(entryKind)
    .filter('__key__', key)
    .filter('userId', '=', userId);

  return datastore.runQuery(query);
};

const getRaidEntry = getEntry(raidProgressKind);

const getSREntry = getEntry(kind);

export const getLatestProgress = userId => getLatestSREntry(userId).then((results) => {
  const latestProgress = results && results[0] && results[0][0];
  return latestProgress;
});

const deleteLatestEntry = getLatestEntryMethod => userId => getLatestEntryMethod(userId).then(
  (results) => {
    const entry = results && results[0] && results[0][0];
    const itemKey = entry && entry[datastore.KEY];
    if (!itemKey) {
      throw new CustomError(`No latest progress item found for userId: ${userId}`, 404);
    }

    return datastore.delete(itemKey).then(() => ({
      deletedEntry: entry,
    }));
  },
);

export const deleteLatestSR = deleteLatestEntry(getLatestSREntry);

export const deleteLatestRaid = deleteLatestEntry(getLatestRaidEntry);

const deleteEntry = getEntryMethod => (userId, id) => getEntryMethod(userId, id).then((results) => {
  const progressEntry = results && results[0] && results[0][0];
  const itemKey = progressEntry && progressEntry[datastore.KEY];
  if (!itemKey) {
    throw new CustomError(`No progress item found for id: ${id}`, 404);
  }

  return datastore.delete(itemKey).then(() => ({
    deletedEntry: progressEntry,
  }));
});

export const deleteSREntry = deleteEntry(getSREntry);

export const deleteRaidEntry = deleteEntry(getRaidEntry);

export const getAllProgressEntriesForKLRange = (minKL, maxKL, limit = 25) => {
  const query = datastore.createQuery(kind)
    .filter('kl', '>=', minKL)
    .filter('kl', '<=', maxKL)
    .limit(limit);

  return datastore.runQuery(query)
    .then(results => results[0].map((r) => {
      const id = _.get(r[datastore.KEY], 'id');
      return { ...r, id };
    }));
};

export const getSponsors = () => {
  const sponsorKind = 'Sponsor';
  const key = datastore.key([sponsorKind, Number(SPONSOR_ENTITY_ID)]);
  return datastore.get(key).then(data => data[0].Names);
};

export const saveRaidDamage = ({
  kl,
  raidStageString,
  raidStage,
  damage,
  resist,
  userId,
  username,
  timestamp,
}) => {
  const raidProgressKey = datastore.key(raidProgressKind);

  const raidProgress = {
    key: raidProgressKey,
    data: {
      kl,
      raidStageString,
      raidNumber: raidStage.raid,
      stageNumber: raidStage.stage,
      bossNumber: raidStage.boss,
      damage,
      resist,
      userId,
      username,
      timestamp,
    },
  };

  return datastore
    .save(raidProgress)
    .catch((err) => {
      console.error('Error saving raidProgress datastore entity:', err);
    });
};
