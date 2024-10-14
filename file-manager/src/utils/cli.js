import { stdin, stdout } from 'process';
import { createInterface } from 'readline';

export const getCLIUsername = () => {
    const usernameArg = process.argv.find((arg) => arg.startsWith('--username='));
    const username = usernameArg ? usernameArg.split('=')[1] : 'Guest';
    return username;
}

// Creates a readline interface for handling user input/output via the command line.
// The prompt property is set to "Enter Command: " which will appear when waiting for input.
export const readline = createInterface({
    input: stdin,
    output: stdout,
    prompt: `\nEnter Command: `
});