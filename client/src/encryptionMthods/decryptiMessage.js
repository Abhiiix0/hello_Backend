import CryptoJS from "crypto-js";

function decryptMessage(encryptedMessage) {
  const bytes = CryptoJS.AES.decrypt(
    encryptedMessage,
    process.env.REACT_APP_SKEY
  );
  return bytes.toString(CryptoJS.enc.Utf8);
}

export default decryptMessage;
