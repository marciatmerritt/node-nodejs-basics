import { promises as fs } from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Creates a new file named `fresh.txt` inside the `files` directory with the content "I am fresh and young".
 * The file is created in the same directory as this script.
 * The function uses the `fs` module to write the file asynchronously.
 * 
 * The file is created with the 'wx' flag, which means it will only be created if it does not already exist.
 * 
 * If the file already exists, an error is thrown with the message "FS operation failed".
 * If any other filesystem error occurs, it is thrown as is.
 *
 * @throws {Error} If the file already exists or another filesystem error occurs.
 */
const create = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'files', 'fresh.txt');
    const content = 'I am fresh and young';

    try {
        await fs.writeFile(filePath, content, { flag: 'wx' });
    } catch (err) {
        if (err.code === 'EEXIST') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }
    console.log('File created successfully!'); 
};

await create();