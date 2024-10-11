import { EOL, arch, cpus, homedir, userInfo } from "node:os";
import { CPU_ARCH_MSG, SYS_USERNAME_MSG } from "./constants.js";
import { convertMHzToGHz, logger } from "./utils.js";

// os --EOL: Get EOL (default system End-Of-Line) and print it to console
export const getEOL = () => {
  logger(`System EOL: ${JSON.stringify(EOL)}`);
};

// os --cpus: Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) and print it to console
export const getCPUs = () => {
  const cpusArray = cpus();
  const numCPUs = cpus().length;
  logger(`Number of CPUs: ${numCPUs}`);

  cpusArray.forEach((cpu, index) => {
    const speedGHz = convertMHzToGHz(cpu.speed);
    logger(`CPU ${index + 1}: ${cpu.model}, ${speedGHz} GHz`);
  });
};

// os --homedir: Get home directory and print it to console
export const getHomeDir = () => {
  logger(homedir());
  return homedir();
};
// os --username: Get current system user name and print it to console
export const getSystemUserName = () => {
  logger(SYS_USERNAME_MSG, userInfo().username);
};

// os --architecture: Get CPU architecture for which Node.js binary has compiled and print it to console
export const getCPUArchitecture = () => {
  logger(CPU_ARCH_MSG, arch());
};
