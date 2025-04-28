import { argv } from 'node:process';

/**
 * Parses command line arguments provided in the format `--propName value`
 * and prints them as a single string in the format: `propName is value, prop2Name is value2`.
 * 
 * The function excludes the first two default arguments (node executable and script path),
 * assumes arguments are always provided in valid `--key value` pairs, and prints the result to the console.
 *
 * @example
 * // Command:
 * //       node args.js --name Marcia --role developer
 * // Output:
 * //       name is Marcia, role is developer
 */
const parseArgs = () => {
    const args = argv.slice(2);
    const parsedArgs = [];

    args.forEach((arg, index) => {
        if (arg.startsWith('--')) {
            const key = arg.replace(/^--/, '');
            const value = args[index + 1];
            parsedArgs.push(`${key} is ${value}`);
        }
    });

    console.log(parsedArgs.join(', '));
};

parseArgs();