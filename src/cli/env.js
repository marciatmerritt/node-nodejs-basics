import { env } from 'node:process';

/**
 * Parses environment variables that start with the prefix `RSS_`
 * and prints them as a single string in the format: `RSS_name1=value1; RSS_name2=value2`.
 * 
 * The function reads all environment variables available to the process,
 * filters out only those prefixed with `RSS_`, and prints them joined by semicolons.
 *
 * @example 
 * // Command:
 * //   RSS_token=abc123 RSS_user=marcia node env.js
 * // Output:
 * //   RSS_token=abc123; RSS_user=marcia
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