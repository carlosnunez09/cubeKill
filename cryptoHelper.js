const CryptoHelper = (() => {
  const passphrase = 'cubekill-secret';
  const salt = new TextEncoder().encode('cubekill-salt');
  let keyPromise = null;

  async function getKey() {
    if (keyPromise) return keyPromise;
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw', enc.encode(passphrase), { name: 'PBKDF2' }, false, ['deriveKey']
    );
    keyPromise = crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
    return keyPromise;
  }

  function bufToBase64(buf) {
    let binary = '';
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  function base64ToBuf(str) {
    const binary = atob(str);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  return {
    async encrypt(obj) {
      const key = await getKey();
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encoded = new TextEncoder().encode(JSON.stringify(obj));
      const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
      const combined = new Uint8Array(iv.byteLength + ciphertext.byteLength);
      combined.set(iv, 0);
      combined.set(new Uint8Array(ciphertext), iv.byteLength);
      return bufToBase64(combined);
    },
    async decrypt(str) {
      const data = base64ToBuf(str);
      const key = await getKey();
      const iv = data.slice(0, 12);
      const ciphertext = data.slice(12);
      const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(iv) }, key, new Uint8Array(ciphertext));
      return JSON.parse(new TextDecoder().decode(plaintext));
    }
  };
})();
