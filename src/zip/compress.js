import { createReadStream, createWriteStream } from 'fs';
import { promises } from 'stream';
import { createGzip } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Compresses `fileToCompress.txt` into `archive.gz` inside the `files` directory
 * using Streams API and gzip compression.
 * 
 * @example
 * // Running:
 * //   node src/zip/compress.js
 * // Will create:
 * //   files/archive.gz
 */
const compress = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filesDir = path.join(__dirname, 'files');
    const inputFile = path.join(filesDir, 'fileToCompress.txt');
    const outputFile = path.join(filesDir, 'archive.gz');

    const source = createReadStream(inputFile);
    const destination = createWriteStream(outputFile);
    const gzip = createGzip(); 

    const pipe = promises.pipeline;
    try {
        await pipe(source, gzip, destination);
        console.log('File compressed successfully!');
    } catch (error) {
        console.error('Error during compression:', error);
    }
};

await compress();