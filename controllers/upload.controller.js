const UserModel = require("../models/user.model");
const { uploadErrors } = require("../utils/error.utils");
const path = require("path");
const multer = require("multer");

const uploadDir = path.join(__dirname, "../client/public/upload/profil/");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(uniqueSuffix);
    const filename = `${uniqueSuffix}.jpg`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");

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

module.exports.uploadProfil = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      const errors = uploadErrors(err);
      return res.status(500).json({ errors });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Please send file" });
    }
    try {
      const fileName = req.file.filename;
      const update = { picture: "./upload/profil/" + fileName };

      await UserModel.findByIdAndUpdate(
        req.body.userId,
        { $set: update },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      ).exec();

      return res.status(201).json({ message: "File uploaded successfully" });
    } catch (err) {
      console.error("Error updating user profile picture:", err.message);
      return res.status(500).json({ error: err.message });
    }
  });
};
