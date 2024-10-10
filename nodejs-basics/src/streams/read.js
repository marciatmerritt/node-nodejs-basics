import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';
import path from 'path';
import { getDirname } from '../utils/dirname.js';

// implement function that reads file `fileToRead.txt` content using Readable Stream and prints it's content into `process.stdout`

const read = async () => {
  const __dirname = getDirname(import.meta.url);
  const inputFilename = path.join(__dirname, 'files', 'fileToRead.txt');
  const input = createReadStream(inputFilename);

  input.pipe(stdout);

  input.on('error', (error) => {
    console.error('Error reading file:', error);
  });
};

await read();
