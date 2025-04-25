import { env } from 'node:process';

/**
 * Reads all environment variables that start with "RSS_" and prints them 
 * to the console in the format: "RSS_name1=value1; RSS_name2=value2"
 */
const parseEnv = () => {
    const envVars = Object.entries(env)
        .filter(([key]) => key.startsWith('RSS_'))
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');
    if (envVars) {
        console.log(envVars);
    }
};

parseEnv();