import { REDIS_PASSWORD, REDIS_PORT, REDIS_URL } from '@/config';
import { JobsOptions, Queue, Worker } from 'bullmq';

// Initialize Redis connection
export const redisConnection = {
  host: REDIS_URL,
  port: Number(REDIS_PORT),
  password: REDIS_PASSWORD,
};

// Set up Queues
const reminderQueue = new Queue('reminderQueue', {
  connection: redisConnection,
});
const emailQueue = new Queue('emailQueue', { connection: redisConnection });

export async function addReminderJob(
  job: any,
  name?: string,
  optional?: JobsOptions,
) {
  const options = { repeat: { every: 5000 } };
  await reminderQueue.add(name ?? job.name, job, optional ?? options);
}

export async function addEmailJob(
  job: any,
  name?: string,
  optional?: JobsOptions,
) {
  const options = { repeat: { every: 5000 } };
  await emailQueue.add(name ?? job.name, job, optional ?? options);
}
