import CryptoJS from "crypto-js";

// Function to encrypt a message before sending it
function encryptMessage(message) {
  return CryptoJS.AES.encrypt(message, process.env.REACT_APP_SKEY).toString();
}
// now we will export this function
export default encryptMessage;
