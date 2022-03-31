const router = require("express").Router();
const usersModal = require("../models/usersModel");
const reviewsModel = require("../models/reviewModel");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authentica");
//update user

router.get("/movie/:id", authenticateToken, async (req, res) => {
  try {
    const reviewsQuery = await reviewsModel
      .find({ movieId: req.params.id })
      .populate("rate")
      .populate("userId");
    res.status(200).json({ reviewsQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/user", authenticateToken, async (req, res) => {
  try {
    const reviewsQuery = await reviewsModel
      .find({ userId: req.user._id })
      .populate("rate")
      .populate("userId");
    res.status(200).json({ reviewsQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const reviewsQuery = await reviewsModel.find().populate("userId");
    res.status(200).json({ reviewsQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/reviewing", authenticateToken, async (req, res) => {
  try {
    const reviewsQuery = await new reviewsModel(req.body);
    reviewsQuery.save();
    res.status(200).json({ reviewsQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
