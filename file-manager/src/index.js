import process from 'node:process';
import { stdin, exit } from 'node:process';
import { CURRENT_DIR_MSG, HOME_DIR, INVALID_INPUT, SYS_EOL } from './utils/constants.js';
import {
  getCPUArchitecture, getCPUs, getEOL,
  getHomeDir, getSystemUserName,
} from './utils/osInfo.js';
import { getCLIUsername } from './utils/cli.js';
import { logger } from './utils/utils.js';
import { CPU_ARCH_MSG, SYS_USERNAME_MSG } from './utils/constants.js';

// get username from CLI argument passed on app start
const username = getCLIUsername();
const userHomeDir = getHomeDir();
const welcomeMsg = `Welcome to the File Manager, ${username}!`;
const exitMsg = `Thank you for using File Manager, ${username}, goodbye!`;

console.log(welcomeMsg);
console.log(CURRENT_DIR_MSG + userHomeDir);

process.on('SIGINT', () => {
  console.log(exitMsg);
  exit(0);
});
stdin.on('data', (chunk) => {
  const input = chunk.toString().trim();
  if (input === '.exit') {
    console.log(exitMsg);
    exit(0);
  } else {
    handleCommands(input);
  }
});

console.log('Start typing. Type ".exit" and press Enter to finish:');

const handleCommands = (input) => {
  const [command, ...args] = input.split(' ');

  switch (command) {
    case 'os':
      switch (args[0]) {
        case '--EOL':
            logger(SYS_EOL + JSON.stringify(getEOL()));
          break;
        case '--cpus':
          const { numCPUs, cpuDetails } = getCPUs();
          logger(`Number of CPUs: ${numCPUs}`);
          cpuDetails.forEach((cpu) => {
            logger(`CPU ${cpu.id}: ${cpu.model}, ${cpu.speedGHz} GHz`);
          });
          break;
        case '--homedir':
          logger(HOME_DIR + getHomeDir());
          break;
        case '--username':
            logger(SYS_USERNAME_MSG + getSystemUserName());
          break;
        case '--architecture':
            logger(CPU_ARCH_MSG + getCPUArchitecture());
          break;

        default:
          console.log(INVALID_INPUT);
      }
      break;

    default:
      console.log('Invalid command');
  }
};
