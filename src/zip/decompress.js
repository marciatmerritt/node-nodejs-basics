import { createReadStream, createWriteStream } from 'fs';
import { promises } from 'stream';
import { createGunzip } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Decompresses `archive.gz` in the `files` directory back into `fileToCompress.txt`
 * using the Streams API and gzip decompression.
 * 
 * @example
 * // Running:
 * //   node src/zip/decompress.js
 * // Will recreate:
 * //   files/fileToCompress.txt
 */
const decompress = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filesDir = path.join(__dirname, 'files');
    const inputFile = path.join(filesDir, 'archive.gz');
    const outputFile = path.join(filesDir, 'fileToCompress.txt');

    const source = createReadStream(inputFile);
    const destination = createWriteStream(outputFile);
    const gunzip = createGunzip();

    const pipe = promises.pipeline;
    try {
        await pipe(source, gunzip, destination);
        console.log('File decompressed successfully!');
    } catch (error) {
        console.error('Error during decompression:', error);
    }
};

await decompress();
