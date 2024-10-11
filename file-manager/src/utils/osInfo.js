import { EOL, arch, cpus, homedir, userInfo } from 'node:os';
import { convertMHzToGHz } from './utils.js';

// os --EOL: Get EOL (default system End-Of-Line)
export const getEOL = () => {
  return EOL;
};

// os --cpus: Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)
export const getCPUs = () => {
  const cpusArray = cpus();
  const numCPUs = cpus().length;
  return {
    numCPUs,
    cpuDetails: cpusArray.map((cpu, index) => ({
      id: index + 1,
      model: cpu.model,
      speedGHz: convertMHzToGHz(cpu.speed),
    })),
  };
};

// os --homedir: Get home directory
export const getHomeDir = () => {
  return homedir();
};
// os --username: Get current system user name
export const getSystemUserName = () => {
  return userInfo().username;
};

// os --architecture: Get CPU architecture for which Node.js binary has compiled
export const getCPUArchitecture = () => {
  return arch();
};
