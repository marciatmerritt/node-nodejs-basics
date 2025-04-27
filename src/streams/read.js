import { createReadStream } from 'node:fs';
import path from 'node:path';
import { stdout } from 'node:process';
import { fileURLToPath } from 'node:url';

/**
 * Reads `fileToRead.txt` inside the `files` directory
 * and prints its content to `process.stdout` using a Readable Stream.
 * 
 * @example
 * // Running:  node src/streams/read.js
 * // Will print: (content of fileToRead.txt)
 */
const read = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filesDir = path.join(__dirname, 'files');
    const fileToRead = path.join(filesDir, 'fileToRead.txt');

    const readStream = createReadStream(fileToRead, { encoding: 'utf-8' });
    readStream.pipe(stdout);

    readStream.on('error', (err) => {
        console.error('Error reading file:', err.message);
    });
};

await read();
