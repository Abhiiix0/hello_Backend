import forge from "node-forge";

function decryptMessage(encryptedMessage) {
  const decoded = forge.util.decode64(encryptedMessage);

  const salt = decoded.slice(0, 16); // Extract salt
  const iv = decoded.slice(16, 32); // Extract IV
  const encryptedContent = decoded.slice(32); // Extract encrypted content

  const key = forge.pkcs5.pbkdf2(process.env.REACT_APP_SKEY, salt, 10000, 32); // Derive key

  const decipher = forge.cipher.createDecipher("AES-CBC", key);
  decipher.start({ iv: iv });
  decipher.update(forge.util.createBuffer(encryptedContent));
  const result = decipher.finish();

  return result ? decipher.output.toString("utf8") : null;
}

export default decryptMessage;
