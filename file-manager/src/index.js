import process from 'node:process';
import { stdin, exit } from 'node:process';
import { CURRENT_DIR_MSG } from './utils/constants.js';
import { getCPUArchitecture, getCPUs, getEOL, getHomeDir, getSystemUserName } from './utils/osInfo.js';
import { getCLIUsername } from './utils/cli.js';

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
})
stdin.on('data', (chunk) => {
    const input = chunk.toString().trim();
    if (input === '.exit') {
      console.log(exitMsg);
      exit(0);
    }
  });
getEOL();
console.log('Start typing. Type ".exit" and press Enter to finish:');

const handleCommands = (input) => {
    const [command, ...args] = input.split(' ');

    switch (command) {
        case 'os':
            if (args[0] === '--EOL') {
                getEOL();
              } else if (args[0] === '--cpus') {
                getCPUs();
              } else {
                console.log('Invalid input');
              }
              break;

              default:
                console.log('Invalid input');
    }
}

