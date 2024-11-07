import { REDIS_PASSWORD, REDIS_PORT, REDIS_URL } from '@/config';
import { delay, JobsOptions, Queue } from 'bullmq';
import { Job } from '@/interfaces/job.interface';

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
const cancelOrderQueue = new Queue('cancelOrderQueue', {
  connection: redisConnection,
});

export async function addReminderJob(
  job: Job,
  name?: string,
  optional?: JobsOptions,
) {
  const options = {
    delay: 3600000,
    removeOnComplete: true,
    removeOnFail: true,
  };
  await reminderQueue.add(name ?? job.name, job, optional ?? options);
}

export async function addAutoCancelOrder(
  job: Job,
  name?: string,
  optional?: JobsOptions,
) {
  const options = {
    delay: 3600000,
    removeOnComplete: true,
    removeOnFail: true,
  };
  await cancelOrderQueue.add(name ?? job.name, job, optional ?? options);
}

export async function addEmailJob(
  job: Job,
  name?: string,
  optional?: JobsOptions,
) {
  const options = {
    delay: 3600000,
    removeOnComplete: true,
    removeOnFail: true,
  };
  await emailQueue.add(name ?? job.name, job, optional ?? options);
}

// export async function sendEmailJob() {}
// export async function doReminderJob() {}
