import { parentPort, workerData } from 'node:worker_threads';

/**
 * Worker thread that listens for a number, multiplies it by 2, and sends back the result.
 */

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    try {
        const n = workerData;
        const result = nthFibonacci(n);
        parentPort.postMessage(result);
    } catch (error) {
        parentPort.postMessage(null);
    }
};

sendResult();
