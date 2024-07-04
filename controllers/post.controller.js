const { equals } = require("validator");
const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const path = require("path");
const multer = require("multer");
const { uploadErrors } = require("../utils/error.utils");

const uploadDir = path.join(__dirname, "../client/public/upload/posts/");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg");
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    const error = new Error("Error: Images only! (jpeg, jpg, png, gif)");
    uploadErrors(error);
    cb(error);
  }
}

module.exports.readPost = async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ createdAt: -1 });

    res.send(posts);
  } catch (err) {
    console.error("Error to get data:", err);
  }
};

module.exports.createPost = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({ error: "Too many files to upload." });
      }
      console.error("Upload error:", err);
      const errors = uploadErrors(err);
      return res.status(500).json({ errors });
    }

    try {
      const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file ? `./upload/posts/${req.file.filename}` : "",
        video: req.body.video,
        likers: [],
        comments: [],
      });

      const post = await newPost.save();
      return res.status(201).json(post);
    } catch (err) {
      console.error("Error saving post:", err);
      return res.status(400).send(err);
    }
  });
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

module.exports.likePost = async (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send("ID unknown : " + id);
  }

  try {
    // add like to post
    const like = await PostModel.findByIdAndUpdate(
      id,
      { $addToSet: { likers: req.body.id } },
      { new: true, upsert: true }
    ).exec();

    // add like to user (the one who liked)
    const likerUser = await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { likes: id } },
      { new: true, upsert: true }
    ).exec();

    return res.send({ like, likerUser });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.unLikePost = async (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send("ID unknown : " + id);
  }

  try {
    // Remove like from post
    const unLike = await PostModel.findByIdAndUpdate(
      id,
      { $pull: { likers: req.body.id } },
      { new: true, upsert: true }
    ).exec();

    // Remove like from user (the one who liked)
    const unLikerUser = await UserModel.findByIdAndUpdate(
      req.body.id,
      { $pull: { likes: id } },
      { new: true, upsert: true }
    ).exec();

    return res.send({ unLike, unLikerUser });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.commentPost = async (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send("ID unknown : " + id);
  }

  try {
    const comment = await PostModel.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    );

    res.send(comment);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.editCommentPost = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send("ID unknown : " + id);
  }

  try {
    const editedComment = await PostModel.findById(id);
    if (!editedComment) {
      return res.status(404).send("Post not found");
    }

    const theComment = editedComment.comments.find((comment) =>
      comment._id.equals(req.body.commentId)
    );

    if (!theComment) {
      return res.status(400).send("The comment isn't found");
    }

    theComment.text = req.body.text;

    await editedComment.save();
    return res.status(200).send(editedComment);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.deleteCommentPost = async (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send("ID unknown : " + id);
  }

  try {
    const deleteComment = await PostModel.findByIdAndUpdate(
      id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true, upsert: true }
    ).exec();

    return res.send({ deleteComment });
  } catch (err) {
    return res.status(400).send(err);
  }
};
