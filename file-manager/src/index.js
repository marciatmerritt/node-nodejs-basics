import { stdin, exit, cwd, stdout } from 'node:process';
import { CTRL_C_TERMINATE, CURRENT_DIR_MSG, INVALID_COMMAND } from './utils/constants.js';
import { getHomeDir } from './utils/osInfo.js';
import { getCLIUsername, readline } from './utils/cli.js';
import { logger } from './utils/utils.js';
import { handleOSCommands } from './commands/os.js';
import { handleHashCommands } from './commands/hash.js';
import { handleCompressCommand, handleDecompressCommand } from './commands/zip.js';

// get username from CLI argument passed on app start
const username = getCLIUsername();
const userHomeDir = await getHomeDir();

const welcomeMsg = `Welcome to the File Manager, ${username}!`;
const exitMsg = `\nThank you for using File Manager, ${username}, goodbye!`;

console.log(welcomeMsg);
console.log(CURRENT_DIR_MSG + userHomeDir);

readline.prompt();

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
        readline.pause();
        await handleCommands(trimmedInput);
        readline.resume();
        readline.prompt();
    }
});

const handleCommands = async (input) => {
  const [command, ...args] = input.split(' ');
//   console.log(command);
//   console.log(args);

  switch (command) {
    case 'os':
        handleOSCommands(args);
        break;
    case 'hash':
        await handleHashCommands(args);
        break;
    case 'compress':
        await handleCompressCommand(args);
        break;
    case 'decompress':
        await handleDecompressCommand(args);
        break;
    default:
      console.log(INVALID_COMMAND);
  }
};