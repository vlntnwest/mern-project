const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = async (req, res) => {
  console.log(req.params);
  const id = req.params.id;

  if (!ObjectID.isValid(id)) return res.status(400).send("ID unknown : " + id);

  try {
    const user = await UserModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    console.error("Error while fetching user:", err);
    res.status(500).send("Internal Server Error");
  }
};
