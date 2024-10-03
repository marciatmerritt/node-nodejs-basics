import { promises as fs } from 'fs';
import path from 'node:path';
import { getDirname } from '../utils/dirname.js';

// implement function that creates new file `fresh.txt` with content `I am fresh and young` inside of the `files` folder
// if file already exists `Error` with message `FS operation failed` must be thrown

const create = async () => {
  const __dirname = getDirname(import.meta.url);
  const newFileName = 'fresh.txt';
  const filePath = path.join(__dirname, 'files', newFileName);
  const fileContent = 'I am fresh and young';

  try {
    await fs.writeFile(filePath, fileContent, { flag: 'wx' });
  } catch (err) {
    if (err.code === 'EEXIST') {
      throw new Error('FS operation failed');
    } else {
      throw new Error('FS operation failed - Unexpected error: ', err);
    }
  }
};

await create();
