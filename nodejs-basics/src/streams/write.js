import { createWriteStream } from 'node:fs';
import { stdin } from 'node:process';
import path from 'path';
import { getDirname } from '../utils/dirname.js';

// implement function that writes `process.stdin` data into file `fileToWrite.txt` content using Writable Stream

const write = async () => {
  const __dirname = getDirname(import.meta.url);
  const outputFilename = path.join(__dirname, 'files', 'fileToWrite.txt');

  const output = createWriteStream(outputFilename);

  console.log('Start typing. Type "exit" and press Enter to finish:');

  stdin.on('data', (chunk) => {
    const input = chunk.toString().trim();

    if (input.toLowerCase() === 'exit') {
      console.log('Exiting and closing file...');
      output.end();
      stdin.pause();
    } else {
      output.write(chunk);
    }
  });

  output.on('error', (error) => {
    console.error('Error writing to file:', error);
  });
};

await write();
