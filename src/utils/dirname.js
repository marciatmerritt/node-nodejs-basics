import path from 'node:path';
import { fileURLToPath } from 'url';

// Utility to get directory name
export const getDirname = (importMetaUrl) => {
    return path.dirname(fileURLToPath(importMetaUrl));
};
