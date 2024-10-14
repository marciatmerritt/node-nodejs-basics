import { cwd, exit, stdin, stdout } from 'process';
import { createInterface } from 'readline';
import { promises as fs } from 'fs';

export const convertMHzToGHz = (speedMHz) => {
  return speedMHz / 1000;
};

export const logger = (message) => {
  stdout.write(message + '\n');
};

// Prompt the user to enter commands and wait for results
export const displayPrompt = () => {
    stdout.write(`Enter a command: `);
};

// Create readline interface for prompting user input
export const readline = createInterface({
    input: stdin,
    output: stdout,
    prompt: `Enter Command: `
});

// Utility function to check if a file exists
export const fileExists = async (filePath) => {
    try {
        await fs.access(filePath);
        return true;
    } catch (error) {
        return false;
    }
};
