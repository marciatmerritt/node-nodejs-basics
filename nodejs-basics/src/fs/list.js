import { promises as fs } from 'fs';
import path from 'node:path';
import { getDirname } from '../utils/dirname.js';
import { ERROR_NO_ENTITY } from '../utils/constants.js';

// implement function that prints all array of filenames from `files` folder into console
// if `files` folder doesn't exists `Error` with message `FS operation failed` must be thrown

const list = async () => {
  const __dirname = getDirname(import.meta.url);
  const filesDirName = 'files';
  const filesDirPath = path.join(__dirname, filesDirName);

  try {
    const files = await fs.readdir(filesDirPath);
    console.log(files);
  } catch (error) {
    if (error.code === ERROR_NO_ENTITY) {
      throw new Error(`FS operation failed: ${filesDirName} does not exist`);
    } else {
      throw new Error('FS operation failed - Unexpected error: ', error);
    }
  }
};

await list();
