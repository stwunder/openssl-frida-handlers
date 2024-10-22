/*
 * Auto-generated by Frida. Please modify to match the signature of RC2_ofb64_encrypt.
 * This stub is currently auto-generated from manpages when available.
 *
 * For full API reference, see: https://frida.re/docs/javascript-api/
 */

{
  /**
   * Called synchronously when about to call RC2_ofb64_encrypt.
   *
   * @this {object} - Object allowing you to store state for use in onLeave.
   * @param {function} log - Call this function with a string to be presented to the user.
   * @param {array} args - Function arguments represented as an array of NativePointer objects.
   * For example use args[0].readUtf8String() if the first argument is a pointer to a C string encoded as UTF-8.
   * It is also possible to modify arguments by assigning a NativePointer object to an element of this array.
   * @param {object} state - Object allowing you to keep state across function calls.
   * Only one JavaScript function will execute at a time, so do not worry about race-conditions.
   * However, do not use this to store function arguments across onEnter/onLeave, but instead
   * use "this" which is an object for keeping state local to an invocation.
   */
  onEnter(log, args, state) {
    console.log('RC2_ofb64_encrypt() intercepted onEnter.');
    console.warn("--- VIOLATION of Rule 7: Use of a Broken or Risky Cryptographic Algorithm. ---");

    this.key = new Uint8Array(args[3].readByteArray(256));

    console.log('key: ' + this.key);

    if(typeof state.key === 'undefined') {
      state.key = [];
    } 

    state.rule2_violated = -1;
    state.rule3_violated = -1;
  },

  /**
   * Called synchronously when about to return from RC2_ofb64_encrypt.
   *
   * See onEnter for details.
   *
   * @this {object} - Object allowing you to access state stored in onEnter.
   * @param {function} log - Call this function with a string to be presented to the user.
   * @param {NativePointer} retval - Return value represented as a NativePointer object.
   * @param {object} state - Object allowing you to keep state across function calls.
   */
  onLeave(log, retval, state) {
    // console.log('RC2_ofb64_encrypt() intercepted onLeave.');
    
    state.key.forEach((keyElement, index) => {
      if(!(this.key.length === 0)) {
        var keyIsEqual = false;

        for(let i = 0; i < keyElement.length && this.key.length > 0 && keyElement.length === this.key.length; i++) {
          keyIsEqual = keyElement[i] === this.key[i];
          // console.log(state.key[index][i] + ' === ' + this.key[i] + ' = ' + keyIsEqual);
        }

        if(keyIsEqual) {
          state.rule3_violated = index;
          // console.log('rule 3 violated at key element with index: ' + state.rule3_violated);
        }        
      }       
    });

    state.key.push(this.key);

    if(state.rule3_violated >= 0 ) {
      console.warn("--- VIOLATION of Rule 3: Do not use constant encryption keys. ---");
    }
  }
}
