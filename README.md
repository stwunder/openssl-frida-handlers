# Frida Handlers for Detecting Cryptographic Misuse in OpenSSL (libcrypto)

This repository provides a collection of **Frida** handlers written in JavaScript to detect **cryptographic misuse** in applications that rely on the **OpenSSL `libcrypto`** library.  
The handlers instrument relevant OpenSSL crypto functions at runtime and report violations of well‑established cryptographic best practices.

***

## Overview

Frida is a dynamic instrumentation framework that enables developers, security researchers, and reverse engineers to inspect and manipulate running applications.  
This project builds on Frida to detect common OpenSSL misuse patterns that may result in insecure or vulnerable cryptographic behavior.

The implemented detection rules are based on the paper:

> **“An empirical study of cryptographic misuse in Android applications”**  
> Manuel Egele, David Brumley, Yanick Fratantonio, and Christopher Kruegel  
> ACM CCS 2013

***

## Detection Rules

The handlers currently detect the following categories of cryptographic misuse:

1.  **Use of ECB mode for encryption**
2.  **Use of a non‑random IV in CBC mode**
3.  **Use of constant (static) encryption keys**
4.  **Use of constant salts in Password‑Based Encryption (PBE)**
5.  **Use of fewer than 1,000 iterations in PBE**
6.  **Use of static seeds for cryptographic random number generators**
7.  **Use of broken or risky cryptographic algorithms**
    *   7a. Weak hash algorithms (e.g., MD5, SHA‑1)

When a violation is detected, the handler prints a clear warning message to the console that includes the rule number and relevant context.

***

## OpenSSL API Coverage

Rule detection applies to OpenSSL calls made through:

*   The **high‑level (EVP) API** (https://docs.openssl.org/3.3/man7/evp/), and
*   The **low‑level crypto APIs** (https://docs.openssl.org/3.0/man7/migration_guide/#low-level-apis)

Both APIs are instrumented to maximize coverage of cryptographic misuse across modern and older OpenSSL‑based applications.

***

## Getting Started

### Prerequisites

You must have **Frida** installed:

👉 <https://frida.re/>

### Installation

The handlers work directly with **`frida-trace`** and require no additional installation steps.

### Usage

1.  Start tracing the target application using `frida-trace`:
    ```bash
    frida-trace -i "crypto_*" <process_name>
    ```
2.  `frida-trace` will generate a `./__handlers__/` directory containing default handlers.
3.  Replace the generated handlers with the ones from this repository:
        frida_handlers/ → ./__handlers__/
    Overwrite existing files when prompted.
4.  Start your target application and trigger cryptographic operations.
5.  Misuse violations will appear in your console output.

***

## Example Output

    AES-CBC with constant IV called.
    --- VIOLATION of Rule 2: Do not use a non-random IV for CBC encryption. ---

    md5() intercepted onEnter.
    --- VIOLATION of Rule 7: Use of a Broken or Risky Cryptographic Algorithm. ---
    --- VIOLATION of Rule 7a: Use of Weak Hash. ---

***

## Project Structure

    frida_handlers/
     ├── <handler files for OpenSSL functions>
     └── ...
    README.md
    LICENSE

***

## Version History

*   **1.0**  
    Initial release containing the core rule set and OpenSSL instrumentation handlers.

***

## Author

**Stefan Wunder**

***

## License

This project is licensed under the **MIT License**.  
See the `LICENSE.md` file for details.

***

## Acknowledgments

Based on findings from:

Manuel Egele, David Brumley, Yanick Fratantonio, and Christopher Kruegel.  
*“An empirical study of cryptographic misuse in Android applications.”*  
ACM CCS ’13, Berlin, 2013.  
<https://doi.org/10.1145/2508859.2516693>
