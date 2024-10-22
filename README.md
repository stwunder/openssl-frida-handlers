# Project Title

Frida handlers for OpenSSL

## Description

[Frida](https://frida.re/) is a dynamic instrumentation toolkit for developers, reverse-engineers, and security researchers. This repository contains a collection of [Frida](https://frida.re/) handlers, written in JavaScript, for detecting cryptographic misuse of popular OpenSSL functions based on the rules of Egele, Brumley, Fratantonio and Krueger:

1. Do not use ECB mode for encryption.
2. Do not use a non-random IV for CBC encryption.
3. Do not use constant encryption keys.
4. Do not use constant salts for password based encryption (PBE).
5. Do not use fewer than 1,000 iterations for password based encryption (PBE).
6. Do not use static seeds to initialize secure random generator.
7. Use of a broken or risky cryptographic algorithm.
7a. Use of weak hash algorithm.

If a misuse of one of the above rules is detected, a rule violation is traced to the console.

## Getting Started

### Prerequisites

* [Frida](https://frida.re/)

### Installing

* Frida handlers are written in JavaScript and can be used out of the box

### Executing program

* Use [frida-trace](https://frida.re/docs/frida-trace/) on your command line to instrument the application, which is using the OpenSSL library
* frida-trace creates default handlers in the ./__handlers__ directory, which are only tracing function calls
* Copy and overwrite the handlers from this repository to the __handlers__ directory to use them instead of the default handlers
* Run the application

## Authors

Stefan Wunder

## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

* Manuel Egele, David Brumley, Yanick Fratantonio, and Christopher Kruegel.
“An empirical study of cryptographic misuse in android applications”. In:
Proceedings of the 2013 ACM SIGSAC Conference on Computer & Communications
Security. CCS ’13. Berlin, Germany: Association for Computing Machinery,
2013, 73–84. isbn: 9781450324779. doi: 10.1145/2508859.2516693.
url: https://doi.org/10.1145/2508859.2516693.