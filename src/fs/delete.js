import { promises as fs } from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Deletes the file `fileToRemove.txt` inside the `files` directory.
 * 
 * If the file does not exist, or a filesystem error occurs during deletion,
 * an error is thrown with the message "FS operation failed".
 * 
 * @throws {Error} If the file does not exist or another filesystem error occurs.
 */
const remove = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filesDir = path.join(__dirname, 'files');
    const filenameToRemove = 'fileToRemove.txt';
    const fileToRemovePath = path.join(filesDir, filenameToRemove);
    
    try {
        await fs.unlink(fileToRemovePath);
    } catch (error) {
        if (error.code === "ENOENT") {
          // File does not exist, throw an error
            throw new Error(`FS operation failed`);
          } else {
            throw new Error('FS operation failed due to an unexpected error');
          }
        }
      };

await remove();