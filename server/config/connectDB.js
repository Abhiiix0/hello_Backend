import mongoose from "mongoose";

// this function connect the DataBase with the server
async function connectDB(params) {
  try {
    //connect with mongodb with url
    await mongoose.connect(process.env.MONGODB_URL);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    connection.on("error", (error) => {
      console.log("Something is wrong in mongoDB", error);
    });
  } catch (error) {
    console.log("Something is wrong", error);
  }
}

export default connectDB;
