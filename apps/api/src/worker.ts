import { Worker } from 'bullmq';
import { redisConnection } from '@/libs/bullmq.lib';
import { Job } from './interfaces/job.interface';
import { TransactionService } from './services/transaction.service';
import { sendCancelOrderEmail } from './libs/nodemailer.lib';

const reminderWorker = new Worker(
  'reminderQueue',
  async (job: any) => {
    const { email, invoice, userName, propertiName, address } = job.data;
    await sendCancelOrderEmail(email, {
      email,
      invoice,
      userName,
      propertiName,
      address,
    });
  },
  {
    connection: redisConnection,
  },
);
const emailWorker = new Worker('emailQueue', async (job: any) => {}, {
  connection: redisConnection,
});
const cancelOrderWorker = new Worker(
  'cancelOrderQueue',
  async (job: any) => {
    const orderJob = job.data as { transaction_id: number };

    return await TransactionService.cancelTransactionById(
      orderJob.transaction_id,
    );
  },
  { connection: redisConnection },
);

reminderWorker.on('completed', (job) => {
  console.log(`${job.id} has completed!`);
});

reminderWorker.on('failed', (job, err) => {
  console.log(`${job?.id} has failed with ${err.message}`);
});
emailWorker.on('completed', (job) => {
  console.log(`${job.id} has completed!`);
});

emailWorker.on('failed', (job, err) => {
  console.log(`${job?.id} has failed with ${err.message}`);
});
cancelOrderWorker.on('completed', (job) => {
  console.log(`${job.id} has completed!`);
});

cancelOrderWorker.on('failed', (job, err) => {
  console.log(`${job?.id} has failed with ${err.message}`);
});

console.log('Worker started!');
