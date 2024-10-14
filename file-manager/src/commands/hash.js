import { normalize } from 'node:path';
import { calculateHash } from '../utils/calcHash.js';
import {
  HASH_FILE_REQUIRED, INVALID_INPUT,
  OPERATION_FAILED, HASH_ERROR,
} from '../utils/constants.js';

/**
 * Handles hash-related commands from the command line.
 * Expects at least one argument: the file path to be hashed.
 * @param {Array<string>} args - Command-line arguments.
 * @returns {Promise<void>} - Logs the hash calculation result or an error.
 */
export const handleHashCommands = async (args) => {
  if (args.length < 1) {
    console.error(`${INVALID_INPUT}: ${HASH_FILE_REQUIRED}`);
    return;
  }

  const filepath = normalize(args[0]);

  try {
    await calculateHash(filepath);
  } catch (error) {
    console.error(`${OPERATION_FAILED}: ${HASH_ERROR} = ${error}`);
  }
};
