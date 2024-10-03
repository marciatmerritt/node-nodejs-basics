import { promises as fs } from "fs";
import path from "node:path";
import { getDirname } from '../utils/dirname.js';

// implement function that copies folder `files` files with all its content into folder `files_copy` at the same level 
// if `files` folder doesn't exists or `files_copy` has already been created `Error` with message `FS operation failed` must be thrown

const copy = async () => {
    const __dirname = getDirname(import.meta.url);
    const filesSrcPath = path.join(__dirname, "files");
    const filesDestPath = path.join(__dirname, "files_copy");

        const filesFolderExists = await fs.access(filesSrcPath).then(() => true).catch(() => false);
        if(!filesFolderExists) {
            throw new Error("FS operation failed: files folder already exists");
        }

        const filesCopyFolderExists = await fs.access(filesDestPath).then(() => true).catch(() => false);
        if (filesCopyFolderExists) {
            throw new Error("FS operation failed: files_copy folder already exists");
        }

    try {
        await fs.cp(filesSrcPath, filesDestPath, { recursive: true });
    } catch (error) {
        throw error;
    }

};

await copy();
