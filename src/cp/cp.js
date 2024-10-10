import { spawn } from 'node:child_process';
import process from 'node:process';
import path from 'node:path';
import { getDirname } from '../utils/dirname.js';

// implement function `spawnChildProcess` that receives array of arguments `args` and
// creates child process from file `script.js`, passing these `args` to it.
// This function should create IPC-channel between `stdin` and `stdout` of master process and child process:
// - child process `stdin` should receive input from master process `stdin`
// - child process `stdout` should send data to master process `stdout`

const spawnChildProcess = async (args) => {
  const __dirname = getDirname(import.meta.url);
  const inputFile = path.join(__dirname, 'files/script.js');

  const child = spawn('node', [inputFile, ...args]);

  // Pipe stdin from the parent process to the child process
  process.stdin.pipe(child.stdin);

  // Pipe stdout from the child process to the parent process
  child.stdout.pipe(process.stdout);

  child.on('error', (error) => {
    console.error('Failed to start child process:', error);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['foo', 'bar']);
