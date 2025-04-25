import { promises as fs } from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Reads and prints the names of all files in the `files` directory to the console.
 * 
 * Throws an error with message "FS operation failed" if the directory does not exist 
 * or any other filesystem error occurs.
 * 
 * @throws {Error} If the `files` folder is missing or an unexpected error occurs.
 */
const list = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filesDir = path.join(__dirname, 'files');
  
    try {
      const files = await fs.readdir(filesDir, {
        withFileTypes: true
      });
      const fileNames = files.map(file => file.name).filter(name => !name
        .startsWith('.'));
      console.log(fileNames);
    } catch (error) {
      if (error.code === "ENOENT") {
        throw new Error(`FS operation failed`);
      } else {
        throw new Error('FS operation failed due to an unexpected error');
      }
    }
  };
  
  await list();
  