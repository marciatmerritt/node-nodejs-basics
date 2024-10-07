import process from 'node:process';

// implement function that parses command line arguments (given in format `--propName value --prop2Name value2`, you don't need to validate it)
// and prints them to the console in the format `propName is value, prop2Name is value2`
const parseArgs = () => {
  const args = process.argv.slice(2);
  const results = {};

  args.forEach((arg, i) => {
    if (arg.startsWith('--')) {
      const key = arg.replace('--', '');
      const value = args[i + 1];
      results[key] = value;
    }
  });
  // Format and print the result
  for (const [key, value] of Object.entries(results)) {
    console.log(`${key} is ${value}`);
  }
};

parseArgs();
