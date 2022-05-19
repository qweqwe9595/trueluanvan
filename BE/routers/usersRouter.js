const router = require("express").Router();
const usersModal = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authentica");
require("dotenv").config();

//multer
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./imgs/newsImgs");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage });

//update user
router.patch(
  "/:id",
  [authenticateToken, upload.single("img")],
  async (req, res) => {
    try {
      const userUpdateQuery = await usersModal.findOneAndUpdate(
        { _id: req.user._id },
        {
          $set: req.body,
        },
        { new: true }
      );
      console.log(req.file);
      if (req.file) {
        userUpdateQuery.img = req.file.filename;
        await userUpdateQuery.save();
      }
      res.status(200).json(userUpdateQuery);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);

router.get("/", authenticateToken, async (req, res) => {
  try {
    res.status(200).json({ message: "success", data: req.user });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
