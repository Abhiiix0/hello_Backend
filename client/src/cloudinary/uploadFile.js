const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/auto/upload`;
// const url = `https://api.cloudinary.com/v1_1/dldypjtlj/auto/upload`;

const uploadImg = async (file) => {
  console.log(url);
  try {
    const formData = new FormData();
    formData.append("file", file);
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
