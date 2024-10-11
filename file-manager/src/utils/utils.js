import { stdout } from 'node:process';

export const convertMHzToGHz = (speedMHz) => {
  return speedMHz / 1000;
};

export const logger = (message) => {
  stdout.write(message + '\n');
};
