# Node.js Basics

## Table of Contents

- [Summary](#summary)
- [Technical Stack](#technical-stack)
- [Completed Modules](#completed-modules)
  - [File System Operations (`src/fs`)](#file-system-operations-srcfs)
  - [Command Line Interface (`src/cli`)](#command-line-interfacesrccli)
  - [Module System (`src/modules`)](#module-systems-srcmodules)
  - [Hashing (`src/hash`)](#hashing-srchash)
  - [Streams (`src/streams`)](#streams-srcstreams)
  - [Zlib Compression (`src/zip`)](#zlib-compression-srczip)
  - [Worker Threads (`src/wt`)](#worker-threads-srcwt)
  - [Child Processes (`src/cp`)](#child-processes-srccp)
- [Notes](#notes)

---

## Summary

This project contains implementations of Node.js fundamental operations across multiple modules, including file system manipulation, CLI parsing, working with streams, hashes, worker threads, zlib compression, and child processes.  
The goal was to gain hands-on experience with core Node.js APIs and asynchronous programming.

All tasks have been completed in accordance with the technical requirements.

## Technical Stack

- Node.js v22.14.0 (or higher 22.x.x version)
- Only built-in Node.js modules were used (no external libraries)
- Asynchronous API preferred where possible
- All pre-existing function signatures preserved

![Node.js](https://img.shields.io/badge/Node.js-22.14.0-brightgreen)
![No External Libraries](https://img.shields.io/badge/Libraries-None-informational)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## Completed Modules

### File System Operations (`src/fs`)

- **create.js**: Creates a `fresh.txt` file with specific content. Throws an error if the file already exists.
- **copy.js**: Copies the `files` folder into a new `files_copy` folder. Error handling for missing folders or existing destination.
- **rename.js**: Renames `wrongFilename.txt` to `properFilename.md`. Handles missing files and conflicts.
- **delete.js**: Deletes `fileToRemove.txt`, throwing an error if it doesn't exist.
- **list.js**: Lists all filenames inside the `files` directory.
- **read.js**: Reads and prints the contents of `fileToRead.txt`.

### Command Line Interface (`src/cli`)

- **env.js**: Parses and prints environment variables with the `RSS_` prefix.
- **args.js**: Parses command-line arguments passed with `--key value` format and prints them.

### Module System (`src/modules`)

- **esm.mjs**: Refactored CommonJS module (`cjsToEsm.cjs`) to ECMAScript Module syntax.

### Hashing (`src/hash`)

- **calcHash.js**: Computes the SHA256 hash of `fileToCalculateHashFor.txt` and outputs the result using the Streams API.

### Streams (`src/streams`)

- **read.js**: Reads and outputs file content using a Readable Stream.
- **write.js**: Writes user input from `stdin` into `fileToWrite.txt` using a Writable Stream.
- **transform.js**: Reads input from `stdin`, reverses it, and outputs the result to `stdout` using a Transform Stream.

### Zlib Compression (`src/zip`)

- **compress.js**: Compresses `fileToCompress.txt` into `archive.gz` using zlib and Streams API.
- **decompress.js**: Decompresses `archive.gz` back into `fileToCompress.txt`.

### Worker Threads (`src/wt`)

- **worker.js**: Worker script that receives data, processes it, and returns the result back to the main thread.
- **main.js**: Creates multiple worker threads equal to the number of logical CPU cores. Sends incremental numbers to workers and collects their results in order.

### Child Processes (`src/cp`)

- **cp.js**: Implements `spawnChildProcess` function. Creates a child process from `files/script.js`, sets up IPC communication between parent and child through `stdin` and `stdout`.

---

## Notes

- All functions correctly handle errors according to the assignment specifications.
- All asynchronous code uses Promises or async/await.
- Project structured cleanly inside the `src` folder based on functionality.
- No third-party modules were used; only Node.js built-in APIs.

---
