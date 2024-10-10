import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';
import path from 'node:path';
import { getDirname } from '../utils/dirname.js';

// implement function that creates number of worker threads (equal to the number of host machine logical CPU cores) from file `worker.js`
// and able to send data to those threads and to receive result of the computation from them.
// You should send incremental number starting from `10` to each `worker`.
// For example: on host machine with **4** cores you should create **4** workers and send **10** to first `worker`, **11** to second `worker`, **12** to third `worker`, **13** to fourth `worker`.
// After all workers will finish, function should log array of results into console. The results are array of objects with 2 properties:
// - `status` - `'resolved'` in case of successfully received value from `worker` or `'error'` in case of error in `worker`
// - `data` - value from `worker` in case of success or `null` in case of error in worker

const performCalculations = async () => {
  const __dirname = getDirname(import.meta.url);
  const workerFile = path.join(__dirname, 'worker.js');
  const numCPUs = cpus().length;
  const workers = [];

  // Function to create a worker promise that resolves the worker's result
  const createWorkerPromise = (workerData) => {
    return new Promise((resolve) => {
      const worker = new Worker(workerFile, { workerData });

      worker.on('message', (data) => {
        resolve({ status: 'resolved', data });
      });

      worker.on('error', () => {
        resolve({ status: 'error', data: null });
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          resolve({ status: 'error', data: null });
        }
      });
    });
  };

  // Create workers and send incremental numbers starting from 10
  for (let i = 0; i < numCPUs; i++) {
    const workerData = 10 + i;
    workers.push(createWorkerPromise(workerData));
  }

  // Wait for all workers to finish and store results
  const results = await Promise.all(workers);

  // Log the results array to the console
  console.log(results);
};

await performCalculations();
