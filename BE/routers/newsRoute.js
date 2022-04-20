const router = require("express").Router();
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authentica");
require("dotenv").config();
const newsModel = require("../models/newsModel");
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

//get all news
router.get("/getall", async (req, res) => {
  try {
    const newsQuery = (await newsModel.find()).reverse();
    res.status(200).json(newsQuery);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a mews
router.get("/getone/:id", authenticateToken, async (req, res) => {
  try {
    const newsQuery = await newsModel
      .findById(req.params.id)
      .populate("userId");
    res.status(200).json(newsQuery);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a news
router.post(
  "/createone",
  [authenticateToken, upload.array("newsImgs", 5)],
  async (req, res) => {
    console.log(req.files);
    try {
      const newsQuery = await new newsModel({
        ...req.body,
        ...{ userId: req.user._id },
      });

      if (req.body.contents) {
        newsQuery?.contents?.forEach((item, index) => {
          newsQuery.contents[index].contentImg = req.files[index].filename;
        });
      }

      await newsQuery.save();
      res.status(200).json(newsQuery);
    } catch (err) {
      console.log(err);
      res.status(500).json(err.message);
    }
  }
);

module.exports = router;
