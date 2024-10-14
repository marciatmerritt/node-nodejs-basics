import { normalize } from 'node:path';
import { calculateHash } from '../utils/calcHash.js';
import {
  FILE_REQUIRED_MSG, INVALID_INPUT,
  OPERATION_FAILED, HASH_ERROR, ERROR_TYPE,
} from '../utils/constants.js';
import { fileExists, logger } from '../utils/utils.js';

/**
 * Handles hash-related commands from the command line.
 * Expects at least one argument: the file path to be hashed.
 * @param {Array<string>} args - Command-line arguments.
 * @returns {Promise<void>} - Logs the hash calculation result or an error.
 */
export const handleHashCommands = async (args) => {
  if (args.length < 1) {
    logger(`${INVALID_INPUT}: ${FILE_REQUIRED_MSG}`, ERROR_TYPE);
    return;
  };

  const filepath = normalize(args[0]);

  const doesFileExist = await fileExists(filepath);
  if (!doesFileExist) {
    logger(`${OPERATION_FAILED}: ${FILE_NOT_FOUND} at ${filepath}`, ERROR_TYPE);
    return;
  }

  try {
    await calculateHash(filepath);
  } catch (error) {
    logger(`${OPERATION_FAILED}: ${HASH_ERROR} = ${error}`, ERROR_TYPE);
  }
};
