import { getEOL, getCPUs, getHomeDir, getSystemUserName, getCPUArchitecture } from '../utils/osInfo.js';
import { SYS_EOL, HOME_DIR, SYS_USERNAME_MSG, CPU_ARCH_MSG, INVALID_INPUT } from '../utils/constants.js';
import { logger } from '../utils/utils.js';

export const handleOSCommands = async (args) => {
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
};
