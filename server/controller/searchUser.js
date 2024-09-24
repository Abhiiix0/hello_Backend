import UserModel from "../model/UserModel.js";

const searchUser = async (req, res) => {
  try {
    console.log(req.body);
    const { search } = req.body;
    console.log(search);
    const query = new RegExp(search, "i", "g");
    console.log(query);

    const user = await UserModel.find({
      $or: [{ name: query }, { email: query }],
    });
    return res.status(200).json({
      user: user,
      status: true,
      message: "User found successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error?.message || error,
      error: true,
    });
  }
};

export default searchUser;
