import { cwd, exit, stdin, stdout } from 'process';
import { promises as fs } from 'fs';

// Converts a speed in MHz to GHz by dividing the value by 1000.
// Useful when handling CPU or network speed conversions.
export const convertMHzToGHz = (speedMHz) => {
  return speedMHz / 1000;
};

// Logs a message to stdout (standard output) and appends a newline character.
// This function is useful for cleanly outputting messages without using console.log().
export const logger = (message) => {
  stdout.write(message + '\n');
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
