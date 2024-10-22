/*
 * Auto-generated by Frida. Please modify to match the signature of EVP_EncryptInit_ex2.
 * This stub is currently auto-generated from manpages when available.
 *
 * For full API reference, see: https://frida.re/docs/javascript-api/
 */

{
  /**
   * Called synchronously when about to call EVP_EncryptInit_ex2.
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
    console.log('EVP_EncryptInit_ex2() intercepted onEnter.');  

    this.ctx = args[0];
    this.cipher = args[1];
    this.key = args[2];
    this.iv = args[3]; 

    if(typeof state.ctx === 'undefined') {
      state.ctx = [];
    } 

    if(typeof state.cipher === 'undefined') {
      state.cipher = [];
    }

    if(typeof state.key === 'undefined') {
      state.key = [];
    } 

    if(typeof state.iv === 'undefined') {
      state.iv = [];
    } 
    
    if(typeof state.nid === 'undefined') {
      state.nid = [];
    }

    state.rule2_violated = -1;
    state.rule3_violated = -1;
  },

  /**
   * Called synchronously when about to return from EVP_EncryptInit_ex2.
   *
   * See onEnter for details.
   *
   * @this {object} - Object allowing you to access state stored in onEnter.
   * @param {function} log - Call this function with a string to be presented to the user.
   * @param {NativePointer} retval - Return value represented as a NativePointer object.
   * @param {object} state - Object allowing you to keep state across function calls.
   */
  onLeave(log, retval, state) {
    // console.log('EVP_EncryptInit_ex() intercepted onLeave.');
    
    var nid = this.ctx.readPointer().readPointer().toInt32();

    var cbcCiphers = { 
      419: "aes_128_cbc", 423: "aes_192_cbc", 427: "aes_256_cbc", 
      1066: "aria_128_cbc", 1071: "aria_192_cbc", 1076: "aria_256_cbc", 
      751: "camellia_128_cbc", 752: "camellia_192_cbc", 753: "camellia_256_cbc", 
      31: "des_cbc", 43: "des_ede_cbc", 44: "des_ede3_cbc", 
      91: "bf_cbc", 34: "idea_cbc", 37: "rc2_cbc", 108: "cast5_cbc", 777: "seed_cbc", 1134: "sm4_cbc"
    };

    // console.log("this.ctx:");
    // console.log(this.ctx.readByteArray(112));
    var keyLength = this.ctx.add(104).readPointer().toInt32();
    // console.log("keyLength: " + keyLength);
    var ivLength = 16; // iv length for the currently implemented ciphers is always 16 bytes
    
    var index = 0;
    
    state.ctx.forEach(ctxElement => {
      //// console.log('ctx: ' + ctxElement);
             
      var currentIV = new Uint8Array(this.iv.readByteArray(ivLength));
      
      if(!(currentIV.length === 0)) {
        var ivIsEqual = false;
      
        for(let i = 0; i < state.iv[index].length && state.iv[index].length === currentIV.length; i++) {
          ivIsEqual = state.iv[index][i] === currentIV[i];

          if(ivIsEqual === false) { 
            break; 
          }
        }

        if(ivIsEqual && nid in cbcCiphers === true && state.nid[index] === nid) {
          state.rule2_violated = index;
          // console.log('rule 2 violated at key element with index: ' + state.rule2_violated);
        }
      }
      
      var currentKey = new Uint8Array(this.key.readByteArray(keyLength));

      if(!(currentKey.length === 0)) {
        var keyIsEqual = false;

        for(let i = 0; i < state.key[index].length && currentKey.length > 0 && state.key[index].length === currentKey.length; i++) {
          keyIsEqual = state.key[index][i] === currentKey[i];

          if(keyIsEqual === false) { 
            break; 
          }
        }

        if(keyIsEqual) {
          state.rule3_violated = index;
          // // console.log('rule 3 violated at key element with index: ' + state.rule3_violated);
        }        
      }  

      index++;    
      
    });

    console.log("key: " + new Uint8Array(this.key.readByteArray(keyLength)));
    console.log("iv: " + new Uint8Array(this.iv.readByteArray(ivLength)));

    // state.cipher.forEach(e => {
    //   // console.log('cipher: ' + e);
    // });

    // state.key.forEach(e => {
    //   // console.log('key: ' + e);
    // });

    // state.iv.forEach(e => {
    //   // console.log('iv: ' + e);
    // });

    // state.nid.forEach(e => {
    //   // console.log('nid: ' + e);
    // });

    if(state.ctx.length === 0) { 

      /**
       * Initialize state on first call of EVP_EncryptInit_ex
       */
      
      state.ctx.push(this.ctx.toInt32());
      state.cipher.push(this.cipher.toInt32());
      state.key.push(new Uint8Array(this.key.readByteArray(keyLength)));
      state.iv.push(new Uint8Array(this.iv.readByteArray(ivLength)));
      state.nid.push(nid);

    } else {
    
      /**
       * Rule 2: Do not use a non-random IV for CBC encryption.
       * Rule 3: Do not use constant encryption keys.
       */

      if(this.ctx.toInt32() != 0 && // ctx must not be NULL
        (state.ctx.indexOf(this.ctx.toInt32()) === -1 || // new ctx
        (state.ctx.indexOf(this.ctx.toInt32()) != -1 && state.cipher.indexOf(this.cipher.toInt32() === -1)))) { // same ctx but different cipher (or cipher is NULL)
        
        if(this.cipher.toInt32() === 0) { // special case: cipher is NULL
          var ctxIndex = state.ctx.lastIndexOf(this.ctx.toInt32()); // FIXME: only works if call with cipher = NULL is next after the first init. if EVP_EncryptInit_ex is called interleaved with cipher = NULL than this doesn't work
          
          if(ctxIndex >= 0) {
            state.key[ctxIndex] = new Uint8Array(this.key.readByteArray(keyLength));
            state.iv[ctxIndex] = new Uint8Array(this.iv.readByteArray(ivLength));

          }
        } else {
          state.ctx.push(this.ctx.toInt32());
          state.cipher.push(this.cipher.toInt32());
          state.key.push(new Uint8Array(this.key.readByteArray(keyLength)));
          state.iv.push(new Uint8Array(this.iv.readByteArray(ivLength)));
          state.nid.push(nid);
        }
      }
    }

    var index = state.cipher.indexOf(this.cipher.toInt32());
    
    if(index === -1) { // cipher = NULL case
      // console.log('No reference for this.cipher found in state.cipher.');
    } 

    if(state.rule2_violated >= 0) {
      console.warn(cbcCiphers[nid] + " with constant IV called.");
      console.warn("--- VIOLATION of Rule 2: Do not use a non-random IV for CBC encryption. ---");
    }  

    if(state.rule3_violated >= 0 ) {
      console.warn(cbcCiphers[nid] + " with constant encryption key called.");
      console.warn("--- VIOLATION of Rule 3: Do not use constant encryption keys. ---");
    }
  }
}
