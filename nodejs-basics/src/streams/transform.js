import { stdin, stdout } from 'node:process';
import { reverseTransform } from '../utils/reverseTransform.js';

// implement function that reads data from `process.stdin`, reverses text using Transform Stream and then writes it into `process.stdout`
const transform = async () => {
  console.log('Start typing. Type "exit" and press Enter to finish:');

  stdin.on('data', (chunk) => {
    const input = chunk.toString().trim();

    if (input.toLowerCase() === 'exit') {
      console.log('Exiting...');
      stdin.pause();
    }
  });

  stdin.pipe(reverseTransform).pipe(stdout);
};

await transform();
