const express = require("express");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");

// Configure multer pour utiliser le stockage sur disque
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../client/public/upload/profil/`); // Spécifiez le répertoire de destination
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Générer un nom de fichier unique
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user db
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
