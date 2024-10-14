import { stdin, exit, cwd, stdout } from 'node:process';
import { normalize } from 'node:path';
import { CTRL_C_TERMINATE, CURRENT_DIR_MSG, HOME_DIR, INVALID_COMMAND, INVALID_INPUT, SYS_EOL } from './utils/constants.js';
import { getHomeDir } from './utils/osInfo.js';
import { getCLIUsername } from './utils/cli.js';
import { logger, displayPrompt, readline } from './utils/utils.js';
import { handleOSCommands } from './commands/os.js';
import { handleHashCommands } from './commands/hash.js';

// get username from CLI argument passed on app start
const username = getCLIUsername();
const userHomeDir = getHomeDir();

const welcomeMsg = `Welcome to the File Manager, ${username}!`;
const exitMsg = `\nThank you for using File Manager, ${username}, goodbye!`;

console.log(welcomeMsg);
console.log(CURRENT_DIR_MSG + userHomeDir);

displayPrompt(readline);


readline.on(CTRL_C_TERMINATE, () => {
    console.log(exitMsg);
    readline.close();
});


readline.on('close', () => {
    exit(0);
});


readline.on('line', async (input) => {
    const trimmedInput = input.trim();

    if (trimmedInput === '.exit') {
        console.log(exitMsg);
        readline.close();
    } else {
        readline.pause(); // pause prompt while processing command
        await handleCommands(trimmedInput);
        readline.resume();
        setTimeout(() => displayPrompt(readline), 50);
    }
});

const handleCommands = async (input) => {
  const [command, ...args] = input.split(' ');
//   console.log(command);
//   console.log(args);

  switch (command) {
    case 'os':
        await handleOSCommands(args);
        break;
    case 'hash':
        await handleHashCommands(args);
        break;
    default:
      console.log(INVALID_COMMAND);
  }
};