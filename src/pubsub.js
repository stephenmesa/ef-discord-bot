import { PubSub } from '@google-cloud/pubsub';

const projectId = process.env.PUBSUB_PROJECTID;

if (!projectId) {
  console.error('Must provide PUBSUB_PROJECTID environment variable!');
  process.exit(1);
}

const pubsubClient = new PubSub({
  projectId,
});

export const publishChartMessage = (channelId, userId) => {
  const topicName = 'process-discord-message';

  const data = JSON.stringify({ channelId, userId });

  const dataBuffer = Buffer.from(data);

  return pubsubClient
    .topic(topicName)
    .publish(dataBuffer);
};
