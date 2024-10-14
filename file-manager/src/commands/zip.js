import { normalize } from 'node:path';
import {
    FILE_REQUIRED_MSG,
    INVALID_INPUT,
  OPERATION_FAILED, FILE_NOT_FOUND,
  COMPRESS_ERROR, DECOMPRESS_ERROR,
  FILE_ALREADY_EXISTS
} from '../utils/constants.js';
import { fileExists } from '../utils/utils.js';
import { compress } from '../utils/compress.js';
import { decompress } from '../utils/decompress.js';

/**
 * Handles compress-related commands from the command line.
 * Expects two arguments: input file path and output file path.
 * @param {Array<string>} args - Command-line arguments.
 * @returns {Promise<void>} - Logs the compression result or an error.
 */
export const handleCompressCommand = async (args) => {
  if (args.length < 2) {
    console.error(`${INVALID_INPUT}: ${FILE_REQUIRED_MSG}`);
    return;
  };

  const inputFilepath = normalize(args[0]);

  const doesInputFileExist = await fileExists(inputFilepath);
  if (!doesInputFileExist) {
    console.error(`${OPERATION_FAILED}: Input ${FILE_NOT_FOUND} at ${inputFilepath}`);
    return;
  };

  const outputFilepath = normalize(args[1]);

  const doesOutputFileExist = await fileExists(outputFilepath);
  if (doesOutputFileExist) {
    console.error(`${OPERATION_FAILED}: Output ${FILE_ALREADY_EXISTS} at ${outputFilepath}`);
    return;
  };

  try {
    await compress(inputFilepath, outputFilepath);
  } catch (error) {
    console.error(`${OPERATION_FAILED}: ${COMPRESS_ERROR} = ${error}`);
  }
};


/**
 * Handles decompress-related commands from the command line.
 * Expects two arguments: input file path and output file path.
 * @param {Array<string>} args - Command-line arguments.
 * @returns {Promise<void>} - Logs the decompression result or an error.
 */
export const handleDecompressCommand = async (args) => {
    if (args.length < 2) {
      console.error(`${INVALID_INPUT}: ${FILE_REQUIRED_MSG}`);
      return;
    };
  
    const inputFilepath = normalize(args[0]);
    const doesInputFileExist = await fileExists(inputFilepath);
    if (!doesInputFileExist) {
      console.error(`${OPERATION_FAILED}: ${FILE_NOT_FOUND} at ${inputFilepath}`);
      return;
    };
  
  
    const outputFilepath = normalize(args[1]);
    const doesOutputFileExist = await fileExists(outputFilepath);
  if (!doesOutputFileExist) {
    console.error(`${OPERATION_FAILED}: ${FILE_NOT_FOUND} at ${outputFilepath}`);
    return;
  };
    try {
      await decompress(inputFilepath, outputFilepath);
    } catch (error) {
      console.error(`${OPERATION_FAILED}: ${DECOMPRESS_ERROR} = ${error}`);
    }
  };
  