import { createWriteStream } from 'node:fs';
import path from 'node:path';
import { stdin } from 'node:process';
import { fileURLToPath } from 'node:url';

/**
 * Reads user input from `process.stdin` and writes it to `fileToWrite.txt`
 * inside the `files` directory using a Writable Stream. It will create the file 
 * if it is not there.
 * 
 * Input continues until the user types "exit" (case-insensitive) and presses Enter.
 * 
 * @example
 * // Command:
 * //   node src/streams/write.js
 * // Example usage:
 * //   Hello world!
 * //   Testing input
 * //   exit
 * //
 * // File `files/fileToWrite.txt` will contain:
 * //   Hello world!
 * //   Testing input
 */
const write = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filesDir = path.join(__dirname, 'files');
    const fileToWrite = path.join(filesDir, 'fileToWrite.txt');

    const writeStream = createWriteStream(fileToWrite, { encoding: 'utf-8' });
    
    stdin.setEncoding('utf-8');

    console.log('Start typing. Type "exit" and press Enter to finish:');


    stdin.on('data', (input) => {
        const trimmedInput = input.trim();

        if (trimmedInput.toLowerCase() === 'exit') {
            console.log('Exiting and closing file...');
            writeStream.end();
            stdin.pause();
        } else {
            writeStream.write(input);
        }
    });
  
    writeStream.on('finish', () => {
        console.log('File written successfully!');
    });

    writeStream.on('error', (error) => {
      console.error('Error writing to file:', error);
    });
  };

await write();