import { promises as fs } from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Renames the file 'wrongFilename.txt' to 'properFilename.md' inside the 'files' directory.
 * 
 * If 'wrongFilename.txt' does not exist, or 'properFilename.md' already exists,
 * the function throws an error with the message "FS operation failed".
 * 
 * Uses the `fs.rename` method to perform the operation.
 * 
 * @throws {Error} If the source file does not exist, destination already exists,
 * or a filesystem error occurs during the rename operation.
 */
const rename = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filesDir = path.join(__dirname, 'files');
    const oldFileName = 'wrongFilename.txt';
    const newFileName = 'properFilename.md';
    const fromPath = path.join(filesDir, oldFileName);
    const toPath = path.join(filesDir, newFileName);

    const files = await fs.readdir(filesDir);
    if (!files.includes(oldFileName) || files.includes(newFileName)) {
        throw new Error('FS operation failed');
    }
    try {
        await fs.rename(fromPath, toPath);
    }
    catch (err) {
        throw new Error('FS operation failed');
    }
};

await rename();