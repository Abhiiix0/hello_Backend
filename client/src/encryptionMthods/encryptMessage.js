import forge from "node-forge";

// Function to encrypt a message before sending it
function encryptMessage(message) {
  const salt = forge.random.getBytesSync(16); // Generate a random salt
  const key = forge.pkcs5.pbkdf2(process.env.REACT_APP_SKEY, salt, 10000, 32); // Derive key
  const iv = forge.random.getBytesSync(16); // Create an initialization vector (IV)

  // Encrypt the message
  const cipher = forge.cipher.createCipher("AES-CBC", key);
  cipher.start({ iv: iv });
  cipher.update(forge.util.createBuffer(message, "utf8"));
  cipher.finish();

  // Concatenate salt, iv, and encrypted message into a single buffer
  const encryptedMessageBuffer = forge.util.createBuffer();
  encryptedMessageBuffer.putBytes(salt);
  encryptedMessageBuffer.putBytes(iv);
  encryptedMessageBuffer.putBuffer(cipher.output);

  // Encode to base64
  const encryptedMessage = forge.util.encode64(
    encryptedMessageBuffer.getBytes()
  );
  return encryptedMessage;
}
// now we will export this function
export default encryptMessage;
