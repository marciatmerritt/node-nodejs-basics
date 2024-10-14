import { stderr, stdout } from 'process';
import { promises as fs } from 'fs';

// Converts a speed in MHz to GHz by dividing the value by 1000.
// Useful when handling CPU or network speed conversions.
export const convertMHzToGHz = (speedMHz) => {
  return speedMHz / 1000;
};

/**
 * Logs a message to stdout (standard output) or stderr (standard error) based on the log type.
 * 
 * @param {string} message - The message to log.
 * @param {string} [type='info'] - The type of log ('info' for stdout, 'error' for stderr).
 *                                Defaults to 'info' for standard output logging.
 */
export const logger = (message, type = 'info') => {
  if (type === 'error') {
    stderr.write(message + '\n');
  } else {
    stdout.write(message + '\n');
  }
};

/**
 * Asynchronously checks whether a file exists at the given file path.
 * @param {string} filePath - Path to the file.
 * @returns {Promise<boolean>} - True if file exists, false otherwise.
 */
export const fileExists = async (filePath) => {
    console.log(`Checking if file exists at: ${filePath}`);
    try {
        await fs.access(filePath);
        return true;
    } catch (error) {
        // console.error(`Error accessing file at: ${filePath}. Error: ${error.message}`);
        return false;
    }
};
