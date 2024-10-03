import { promises as fs } from 'fs';
import path from 'node:path';
import { getDirname } from '../utils/dirname.js';

// implement function that renames file `wrongFilename.txt` to `properFilename` with extension `.md`
// if there's no file `wrongFilename.txt` or `properFilename.md` already exists `Error` with message `FS operation failed` must be thrown

const rename = async () => {
  const __dirName = getDirname(import.meta.url);
  const dirPath = path.join(__dirName, 'files');
  const oldFileName = 'wrongFilename.txt';
  const newFileName = 'properFilename.md';
  const oldFilePath = path.join(dirPath, oldFileName);
  const newFilePath = path.join(dirPath, newFileName);

  // case-sensitive check for new & old file names
  const files = await fs.readdir(dirPath);
  if (files.includes(newFileName)) {
    throw new Error(`FS operation failed: ${newFileName} already exists`);
  }

  if (!files.includes(oldFileName)) {
    throw new Error(`FS operation failed: ${oldFileName} does not exist`);
  }

  try {
    await fs.rename(oldFilePath, newFilePath);
  } catch (error) {
    throw new Error('FS operation failed - Unexpected error: ', error);
  }
};

await rename();
