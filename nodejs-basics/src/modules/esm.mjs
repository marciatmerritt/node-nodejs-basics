import path from 'path';
import { promises as fs } from 'fs';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c.js';
import { getDirname } from '../utils/dirname.js';

// rewrite it to it's equivalent in ECMAScript notation (and rename it to `esm.mjs`)

const random = Math.random();
const __filename = import.meta.url;
const __dirname = getDirname(__filename);
const aJsonFile = path.join(__dirname, 'files/a.json');
const bJsonFile = path.join(__dirname, 'files/b.json');

let unknownObject;

if (random > 0.5) {
  unknownObject = JSON.parse(await fs.readFile(aJsonFile, 'utf-8'));
} else {
  unknownObject = JSON.parse(await fs.readFile(bJsonFile, 'utf-8'));
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
