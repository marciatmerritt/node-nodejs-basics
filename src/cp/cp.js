import { spawn } from 'node:child_process';
import process from 'node:process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Spawns a child process running the `script.js` file,
 * forwards stdin and stdout streams between the master and child processes,
 * and handles manual closing of streams when "exit" is typed.
 *
 * The function connects:
 * - `process.stdin` → `child.stdin`
 * - `child.stdout` → `process.stdout`
 *
 * If the user types "exit" (case-insensitive) and presses Enter,
 * the stdin streams are unpiped and closed gracefully, terminating the process.
 *
 * @param {string[]} args - Array of arguments to pass to the child process.
 *
 * @example
 * // Example usage:
 * // Spawns the child process with arguments "foo" and "bar":
 * spawnChildProcess(['foo', 'bar']);
 *
 * // Then, type input to be sent to the child.
 * // Type "exit" and press Enter to gracefully close the process.
 */
const spawnChildProcess = async (args) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filesDir = path.join(__dirname, 'files');
    const fileToInput = path.join(filesDir, 'script.js');

    const child = spawn('node', [fileToInput, ...args], {
        stdio: ['pipe', 'pipe', 'inherit'],
    });

    process.stdin.pipe(child.stdin);

    child.stdout.pipe(process.stdout);

    process.stdin.on('data', (data) => {
        const input = data.toString().trim();
        if (input.toLowerCase() === 'exit') {
            process.stdin.unpipe(child.stdin);
            child.stdin.end();
            process.stdin.end();
        }
    });

    child.on('error', (error) => {
        console.error('Failed to start child process:', error);
    });    
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['foo', 'bar']);
