import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';

/**
 * Calculates and prints the SHA-256 hash of `fileToCalculateHashFor.txt`
 * using the Streams API.
 * 
 * If the file does not exist or an error occurs while reading,
 * an error with the message "FS operation failed" will be thrown.
 * 
 * @example
 * // Given file `files/fileToCalculateHashFor.txt` containing:
 * //   Calculate hash for me!
 * 
 * // Running:
 * //   node src/hash/calcHash.js
 * 
 * // Expected output (example hash):
 * //   7b90ad9e325c1c22b15c36cbe19413e3c471e5a711b8b828c8ebfcfd71d1d6db
 */
const calculateHash = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filesDir = path.join(__dirname, 'files');
    const fileToHash = path.join(filesDir, 'filesToCalculateHashFor.txt');
  
    const hash = createHash('sha256');
    const input = createReadStream(fileToHash);
  
    input.on('error', (error) => {
      throw error;
    });
  
    input.on('data', (chunk) => {
      hash.update(chunk);
    });
  
    input.on('end', () => {
      console.log(hash.digest('hex'));
    });
  };
  
  await calculateHash();
  