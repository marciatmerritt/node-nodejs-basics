import { stdin, stdout } from 'node:process';
import { Transform } from 'node:stream';

/**
 * Reads user input from `process.stdin`, reverses each line,
 * and writes the reversed content to `process.stdout` using a Transform Stream.
 * 
 * Input continues until the user types "exit" (case-insensitive) and presses Enter.
 * 
 * @example
 * // Command:
 * //   node src/streams/transform.js
 * // Example:
 * //   Hello
 * //   (prints: olleH)
 */
const transform = async () => {

    console.log('Start typing. Type "exit" and press Enter to finish:');

    const reverseTransform = new Transform({
        transform(input, encoding, callback) {
            const trimmedInput = input.toString().trim();

            if (trimmedInput.toLowerCase() === 'exit'){
                console.log('Exiting...');
                stdin.pause();
                callback();
            } else {
                const reverseText = trimmedInput.split('').reverse().join('') + '\n';
                callback(null, reverseText);
            }
        }
    });
    
    stdin.pipe(reverseTransform).pipe(stdout);
};

await transform();
