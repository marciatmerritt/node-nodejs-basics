import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { createGzip } from 'node:zlib';
import path from 'node:path';
import { getDirname } from '../utils/dirname.js';

// implement function that compresses file `fileToCompress.txt` to `archive.gz` using `zlib` and Streams API

const compress = async () => {
  const __dirname = getDirname(import.meta.url);
  const inputFile = path.join(__dirname, 'files', 'fileToCompress.txt');
  const outputFile = path.join(__dirname, 'files/archive.gz');

  const readStream = createReadStream(inputFile);
  const writeStream = createWriteStream(outputFile);
  const gzipStream = createGzip();

  try {
    await new Promise((resolve, reject) => {
        pipeline(readStream, gzipStream, writeStream, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
    console.log('File successfully compressed!');
  } catch (error) {
    console.error('Compression failed: ', error);
  }
};

await compress();
