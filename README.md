# Project Title

OpenSSL Frida Handlers

## Description

[Frida](https://frida.re/) is a dynamic instrumentation toolkit for developers, reverse-engineers, and security researchers. This repository contains a collection of [Frida](https://frida.re/) handlers, written in JavaScript, for detecting cryptographic misuse of popular OpenSSL functions.

## Getting Started

### Prerequisites

* [Frida](https://frida.re/)

### Installing

* Frida handlers are written in JavaScript and can be used out of the box

### Executing program

* Use [frida-trace](https://frida.re/docs/frida-trace/) on your command line to instrument the OpenSSL library
* frida-trace creates default handlers in the ./__handlers__ directory, which are only tracing function calls
* Copy and overwrite the handlers from this repository to the __handlers__ directory to use them instead of the default handlers
* Run the application, which is using OpenSSL

## Authors

Stefan Wunder

## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the MIT License - see the LICENSE.md file for details