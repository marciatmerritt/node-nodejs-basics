import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { createGunzip } from 'node:zlib';
import path from 'node:path';
import { getDirname } from '../utils/dirname.js';

//implement function that decompresses `archive.gz` back to the `fileToCompress.txt`
// with same content as before compression using `zlib` and Streams API

const decompress = async () => {
  const __dirname = getDirname(import.meta.url);
  const outputFile = path.join(__dirname, 'files', 'fileToCompress.txt');
  const inputFile = path.join(__dirname, 'files/archive.gz');

  const readStream = createReadStream(inputFile);
  const writeStream = createWriteStream(outputFile);
  const gunzipStream = createGunzip();

  try {
    await new Promise((resolve, reject) => {
      pipeline(readStream, gunzipStream, writeStream, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
    console.log('File successfully decompressed!');
  } catch (error) {
    console.error('Decompression failed: ', error);
  }
};

await decompress();
