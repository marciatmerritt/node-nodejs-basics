import { createReadStream } from 'node:fs';
import path from 'path';
import { getDirname } from '../utils/dirname.js';

// implement function that calculates SHA256 hash for file `fileToCalculateHashFor.txt` and logs it into console as `hex` using Streams API

const calculateHash = async () => {
  const __dirname = getDirname(import.meta.url);
  const inputFilename = path.join(
    __dirname,
    'files/fileToCalculateHashFor.txt',
  );
  const { createHash } = await import('node:crypto');

  const hash = createHash('sha256');
  const input = createReadStream(inputFilename);

  input.pipe(hash);
  hash.setEncoding('hex');
  hash.on('finish', () => {
    console.log(`SHA256 hash: ${hash.read()}`);
  });
};

await calculateHash();
