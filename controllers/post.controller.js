const postModel = require("../models/post.model");
const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readPost = async (req, res) => {
  try {
    const posts = await PostModel.find();

    res.send(posts);
  } catch (err) {
    console.error("Error to get data:", err);
  }
};

module.exports.createPost = async (req, res) => {
  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = async (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) return res.status(400).send("ID unknown : " + id);

  const updatedRecord = {
    message: req.body.message,
  };

  try {
    const updatePost = await PostModel.findByIdAndUpdate(
      id,
      { $set: updatedRecord },
      { new: true }
    ).exec();

    return res.send(updatePost);
  } catch (err) {
    console.log("Update error: " + err);
  }
};
module.exports.deletePost = async (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) return res.status(400).send("ID unknown : " + id);

  try {
    const deletePost = await PostModel.findByIdAndDelete({ _id: id }).exec();
    return res.send(deletePost);
  } catch (err) {
    console.log("Delete error: " + err);
  }
};
