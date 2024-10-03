import { promises as fs } from 'fs';
import path from 'node:path';
import { getDirname } from '../utils/dirname.js';
import { ERROR_NO_ENTITY } from '../utils/constants.js';

// implement function that deletes file `fileToRemove.txt`
// if there's no file `fileToRemove.txt` `Error` with message `FS operation failed` must be thrown

const remove = async () => {
  const __dirName = getDirname(import.meta.url);
  const dirPath = path.join(__dirName, 'files');
  const delFileName = 'fileToRemove.txt';
  const delFilePath = path.join(dirPath, delFileName);

  try {
    await fs.unlink(delFilePath);
  } catch (error) {
    if (error.code === ERROR_NO_ENTITY) {
      throw new Error(`FS operation failed: ${delFilePath} does not exist`);
    } else {
      throw new Error('FS operation failed - Unexpected error: ', error);
    }
  }
};

await remove();
