import { promises as fs } from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

// implement function that creates new file `fresh.txt` with content `I am fresh and young` inside of the `files` folder
// if file already exists `Error` with message `FS operation failed` must be thrown

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Use `fileURLToPath` to get the current file directory

const create = async () => {
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

create();
