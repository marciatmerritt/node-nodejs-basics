import { promises as fs } from 'fs';
import path from 'node:path';
import { getDirname } from '../utils/dirname.js';
import { ERROR_NO_ENTITY } from '../utils/constants.js';

// implement function that prints content of the `fileToRead.txt` into console
// if there's no file `fileToRead.txt` `Error` with message `FS operation failed` must be thrown

const read = async () => {
  const __dirName = getDirname(import.meta.url);
  const dirPath = path.join(__dirName, 'files');
  const readFileName = 'fileToRead.txt';
  const readFilePath = path.join(dirPath, readFileName);

    try {
        const fileContent = await fs.readFile(readFilePath, 'utf-8');
        console.log(fileContent);
    } catch (error) {
        if (error.code === ERROR_NO_ENTITY) {
            throw new Error(`FS operation failed: ${readFileName} does not exist`);
          } else {
            throw new Error('FS operation failed - Unexpected error: ', error);
          } 
    }
};

await read();