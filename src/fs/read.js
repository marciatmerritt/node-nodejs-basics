import { promises as fs } from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Reads and prints the content of `fileToRead.txt` located in the `files` directory.
 * 
 * If the file does not exist or another filesystem error occurs,
 * the function throws an error with the message "FS operation failed".
 *
 * @throws {Error} If the file cannot be read or does not exist.
 */
const read = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filesDir = path.join(__dirname, 'files');
    const fileToRead = path.join(filesDir, 'fileToRead.txt');
  
    try {
      const data = await fs.readFile(fileToRead, 'utf8');
      console.log(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        throw new Error(`FS operation failed`);
      } else {
        throw new Error('FS operation failed due to an unexpected error');
      }
    }
  };
  
  await read();
  