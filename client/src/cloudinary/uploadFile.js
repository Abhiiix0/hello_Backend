import imageCompression from "browser-image-compression";
const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/auto/upload`;
// const url = `https://api.cloudinary.com/v1_1/dldypjtlj/auto/upload`;

const uploadImg = async (file) => {
  console.log(url);
  try {
    const options = {
      maxSizeMB: 1, // Maximum size in MB
      maxWidthOrHeight: 1920, // Maximum width or height
      useWebWorker: true, // Use web workers for faster processing
    };
    const compressedFile = await imageCompression(file, options);
    const formData = new FormData();
    formData.append("file", compressedFile);
    formData.append("upload_preset", "chat-app-file");
    const res = await fetch(url, {
      method: "post",
      body: formData,
    });
    const resData = await res.json();
    console.log(resData);
    return resData;
  } catch (error) {
    console.log(error);
  }
};
// chat-app-file
export default uploadImg;
