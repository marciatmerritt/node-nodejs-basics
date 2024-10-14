import {
  getEOL, getCPUs, getHomeDir,
  getSystemUserName, getCPUArchitecture,
} from '../utils/osInfo.js';
import {
  SYS_EOL, HOME_DIR, SYS_USERNAME_MSG,
  CPU_ARCH_MSG, INVALID_INPUT, OPERATION_FAILED,
} from '../utils/constants.js';
import { logger } from '../utils/utils.js';

/**
 * Handles operating system-related commands by interpreting the first argument (`args[0]`).
 * Depending on the input argument, it retrieves information such as the system's EOL, CPUs, home directory,
 * username, and architecture, then logs the result.
 *
 * @param {Array} args - An array of command-line arguments where args[0] specifies the OS command to execute.
 *
 * Supported commands:
 *   --EOL         : Logs the system's default end-of-line marker.
 *   --cpus        : Logs the number of CPUs and their details (model and clock rate in GHz).
 *   --homedir     : Logs the user's home directory.
 *   --username    : Logs the current system's username.
 *   --architecture: Logs the CPU architecture that Node.js was compiled for.
 *   Default       : Logs an invalid input message if the command is not recognized.
 *
 * This function is asynchronous, as it awaits results from OS information functions.
 * In case of errors during execution, it will catch and log them.
 *
 * @returns {void} - Logs the result or an error message to the console.
 */
export const handleOSCommands = async (args) => {
  try {
    switch (args[0]) {
      case '--EOL':
        logger(SYS_EOL + JSON.stringify(await getEOL()));
        break;
      case '--cpus': {
        const { numCPUs, cpuDetails } = await getCPUs();
        logger(`Number of CPUs: ${numCPUs}`);
        cpuDetails.forEach((cpu) => {
          logger(`CPU ${cpu.id}: ${cpu.model}, ${cpu.speedGHz} GHz`);
        });
        break;
      }
      case '--homedir':
        logger(HOME_DIR + (await getHomeDir()));
        break;
      case '--username':
        logger(SYS_USERNAME_MSG + (await getSystemUserName()));
        break;
      case '--architecture':
        logger(CPU_ARCH_MSG + (await getCPUArchitecture()));
        break;
      default:
        logger(INVALID_INPUT);
    }
  } catch (error) {
    console.error(`${OPERATION_FAILED}: ${error.message}`);
  }
};
