/*
 * Auto-generated by Frida. Please modify to match the signature of Camellia_cfb1_encrypt.
 * This stub is currently auto-generated from manpages when available.
 *
 * For full API reference, see: https://frida.re/docs/javascript-api/
 */

{
  /**
   * Called synchronously when about to call Camellia_cfb1_encrypt.
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
    console.log('Camellia_cfb1_encrypt() intercepted onEnter.');  

    this.key = new Uint8Array(args[3].readByteArray(280)); // 128 = 8 + 68 * sizeof(int)
    this.enc = args[6].toInt32();

    console.log('key: ' + this.key);
    // console.log('enc: ' + this.enc);

    if(typeof state.key === 'undefined') {
      state.key = [];
    } 
    
    if(typeof state.enc === 'undefined') {
      state.enc = [];
    }

    state.rule3_violated = -1;  
},

  /**
   * Called synchronously when about to return from Camellia_cfb1_encrypt.
   *
   * See onEnter for details.
   *
   * @this {object} - Object allowing you to access state stored in onEnter.
   * @param {function} log - Call this function with a string to be presented to the user.
   * @param {NativePointer} retval - Return value represented as a NativePointer object.
   * @param {object} state - Object allowing you to keep state across function calls.
   */
  onLeave(log, retval, state) {
    // console.log('Camellia_cfb1_encrypt() intercepted onLeave.');
    
    if(this.enc == 1) {
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
    }

    if(this.enc == 1) {
      state.key.push(this.key);
      state.enc.push(this.enc);
    }

    if(state.rule3_violated >= 0 ) {
      console.warn("--- VIOLATION of Rule 3: Do not use constant encryption keys. ---");
    }
  }
}
