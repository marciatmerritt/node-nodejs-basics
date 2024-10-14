import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { normalize } from 'node:path';
import { fileExists, logger } from './utils.js';
import { FILE_NOT_FOUND, HASH_ERROR, OPERATION_FAILED } from './constants.js';

/**
 * Asynchronously calculates the hash of a file.
 * @param {string} filepath - The path to the file for which the hash will be calculated.
 * @param {string} [algorithm='sha256'] - The hash algorithm to use (default is sha256).
 * @param {string} [encoding='hex'] - The encoding format for the hash output (default is hex).
 * @returns {Promise<void>} - Logs the hash value on success or an error message on failure.
 */
export const calculateHash = async (
  filepath,
  algorithm = 'sha256',
  encoding = 'hex',
) => {
  try {
    const hashMsg = `${algorithm} hash: `;
    const normalizedFilePath = normalize(filepath);

    const doesFileExist = await fileExists(normalizedFilePath);
    if (!doesFileExist) {
      throw new Error(`${OPERATION_FAILED}: ${FILE_NOT_FOUND}`);
    }

    const hash = createHash(algorithm);
    const input = createReadStream(normalizedFilePath);

    // Loop through the file content in chunks and update the hash with each chunk
    for await (const chunk of input) {
      hash.update(chunk);
    }
    logger(hashMsg + hash.digest(encoding));
  } catch (error) {
    console.error(`${OPERATION_FAILED}: ${HASH_ERROR} = ${error}`);
  }
};
