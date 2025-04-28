import { cpus } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Worker } from 'node:worker_threads';

/**
 * Creates worker threads equal to number of CPU cores,
 * sends them incremental numbers starting from 10, and collects results into an array.
 */
const performCalculations = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const workerFile = path.join(__dirname, 'worker.js');
    const numCpus = cpus().length;
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

    for (let i = 0; i < numCpus; i++){
        const workerData = 10 + i;
        workers.push(createWorkerPromise(workerData));
    };

    // Wait for all workers to finish and store results
    const results = await Promise.all(workers);

    // Log the results array to the console
    console.log(results);
};

await performCalculations();
