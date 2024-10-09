import { Transform } from 'node:stream';

// A transform stream that reverses the input text and adds a new line after each reversal
export const reverseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const reversedText = chunk.toString().split('').reverse().join('') + '\n';
    callback(null, reversedText);
  },
});
