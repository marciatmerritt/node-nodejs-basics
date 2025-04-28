import { promises as fs } from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Copies the `files` directory with all its contents into a new `files_copy` directory at the same level. 
 * 
 * Uses the `fs.cp` method with the `recursive` flag to perform a deep copy of all contents.
 * 
 * If the `files` directory does not exist, or if the `files_copy` directory already exists,
 * the function throws an error with the message "FS operation failed".
 * 
 * Any other unexpected filesystem errors encountered during the copy process are also thrown as errors.
 *
 * @throws {Error} If the source folder does not exist, destination folder already exists,
 * or another filesystem error occurs during the copy operation.
 */
const copy = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const sourcePath = path.join(__dirname, 'files');
    const destPath = path.join(__dirname, 'files_copy');

    const sourceExists = await fs.access(sourcePath).then(() => true).catch(() => false);
    if (!sourceExists) {
        throw new Error('FS operation failed');
    };

    const destExists = await fs.access(destPath).then(() => true).catch(() => false);
    if (destExists) {
        throw new Error('FS operation failed');
    };

    try {
        await fs.cp(sourcePath, destPath, { recursive: true });
    } catch (err) {
        throw new Error('FS operation failed');
    };
    console.log('File copied successfully!');
};

await copy();
