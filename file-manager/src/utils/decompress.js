import { createReadStream, createWriteStream } from 'node:fs';
import { normalize } from 'node:path';
import { pipeline } from 'node:stream';
import { createGunzip } from 'node:zlib';
import { ERROR_TYPE, FILE_ALREADY_EXISTS, FILE_NOT_FOUND } from './constants.js';
import { fileExists, logger } from './utils.js';

export const decompress = async (inputFilepath, outputFilepath) => {
  const inputFile = normalize(inputFilepath);
  const outputFile = normalize(outputFilepath);

  try {
    await fileExists(inputFile);
  } catch (error) {
    logger(`Input ${FILE_NOT_FOUND} at ${inputFile}`, ERROR_TYPE);
  };

    try {
      await fileExists(outputFile);
      logger(`Output ${FILE_ALREADY_EXISTS} at ${outputFile}`, ERROR_TYPE);
      return;
    } catch (error) {
      // Output file does not exist, proceed with compression
    };

  const readStream = createReadStream(inputFile);
  const writeStream = createWriteStream(outputFile);
  const gunzipStream = createGunzip();

  try {
    await new Promise((resolve, reject) => {
      pipeline(readStream, gunzipStream, writeStream, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
    console.log('File successfully decompressed!');
  } catch (error) {
    console.error('Decompression failed: ', error);
  }
};
