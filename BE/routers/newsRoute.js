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
    let newsQuery = await newsModel.find();
    if (req.query.query === "user") {
      newsQuery = await newsModel.find().populate("userId");
    }
    res.status(200).json(newsQuery.reverse());
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get all approved news
router.get("/getapproved", async (req, res) => {
  try {
    let newsQuery = await newsModel.find({ approved: true }).populate("userId");

    res.status(200).json(newsQuery.reverse());
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get a mews
router.get("/getone/:id", async (req, res) => {
  try {
    const newsQuery = await newsModel
      .findById(req.params.id)
      .populate("userId");
    res.status(200).json(newsQuery);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get newss with name
router.get("/getbyname", async (req, res) => {
  try {
    if (!req.query.name) req.query.name = "";
    const newsQuery = await newsModel
      .find({ newsName: { $regex: req.query.name } })
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
          if (req.files.length === 0) return;
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

//create a news
router.patch("/approving/:id", async (req, res) => {
  try {
    const newsQuery = await newsModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { approved: true },
      },
      { new: true }
    );
    res.status(200).json(newsQuery);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});
//delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const newsQuery = await newsModel.findByIdAndDelete(req.params.id);
    res.status(200).json(newsQuery);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

module.exports = router;
