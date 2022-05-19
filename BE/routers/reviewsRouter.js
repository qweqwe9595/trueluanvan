const router = require("express").Router();
const usersModal = require("../models/usersModel");
const reviewsModel = require("../models/reviewModel");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authentica");
//update user

router.get("/movie/:id", async (req, res) => {
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
    const userQuery = await usersModal.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { reviews: req.body.movieId },
      },
      { new: true }
    );
    res.status(200).json({ reviewsQuery, userQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.patch("/update/:id", authenticateToken, async (req, res) => {
  try {
    const reviewsQuery = await reviewsModel.findById(req.params.id);
    if (req.user.id.toString() !== reviewsQuery.userId.toString())
      return res.status(400).json({ message: "can only update ur review" });
    const reviewsQueryUpdate = await reviewsModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ reviewsQueryUpdate });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const reviewsQuery = await reviewsModel.findById(req.params.id);
    if (req.user.id.toString() !== reviewsQuery.userId.toString())
      return res.status(400).json({ message: "can only update ur review" });
    const reviewsQueryDelete = await reviewsModel.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json({ reviewsQueryDelete });
  } catch (error) {
    res.status(500).json(error.message);
  }
});
module.exports = router;
