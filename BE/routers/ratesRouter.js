const router = require("express").Router();
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authentica");
const ratesModel = require("../models/ratesModel");
require("dotenv").config();

//get all rates
router.get("/", async (req, res) => {
  try {
    const ratesQuery = await ratesModel.find();
    res.status(200).json(ratesQuery);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get average point of a move rating
router.get("/movie/average/:id", async (req, res) => {
  try {
    const ratesQuery = await ratesModel.find({ movieId: req.params.id });
    if (ratesQuery.length == 0)
      return res.status(200).json({ averagePoint: "No rating" });
    const totalPoint = ratesQuery.reduce((prev, curr, index) => {
      return prev + curr.point;
    }, 0);

    const averagePoint = (totalPoint / ratesQuery.length).toFixed(1);

    res.status(200).json({ averagePoint: averagePoint });
  } catch (error) {
    res.status(500).json(err);
  }
});
//get a movie all rating
router.get("/movie/:id", authenticateToken, async (req, res) => {
  try {
    const ratesQuery = await ratesModel.find({ movieId: req.params.id });
    res.status(200).json(ratesQuery);
  } catch (error) {
    res.status(500).json(err);
  }
});

//get all users rating
router.get("/user", authenticateToken, async (req, res) => {
  try {
    const ratesQuery = await ratesModel.find({ userId: req.user.id });
    res.status(200).json(ratesQuery);
  } catch (error) {
    res.status(500).json(err);
  }
});
//get a user rating of a movie
router.get("/usersmovierate/:id", authenticateToken, async (req, res) => {
  try {
    const ratesQuery = await ratesModel.findOne({
      movieId: req.params.id,
      userId: req.user._id,
    });

    res.status(200).json(ratesQuery);
  } catch (error) {
    res.status(500).json(err);
  }
});
//get a rating
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const ratesQuery = await ratesModel.findById(req.params.id);
    res.status(200).json(ratesQuery);
  } catch (err) {
    res.status(500).json(err);
  }
});

//rate a movie
router.post("/rating", authenticateToken, async (req, res) => {
  try {
    const movieQuery = await ratesModel.findOne({
      movieId: req.body.movieId,
      userId: req.user._id,
    });
    if (movieQuery && req.body.point === 0) {
      const deleteQuery = await ratesModel.findByIdAndDelete(movieQuery._id);
      return res.status(200).json({ deleteQuery });
    }
    if (movieQuery) {
      const movieUpdate = await ratesModel.findOneAndUpdate(
        { movieId: req.body.movieId },
        {
          $set: {
            ...req.body,
            ...{ userId: req.user._id },
          },
        },
        { new: true }
      );
      return res.status(200).json(movieUpdate);
    }
    const newRateQuery = await new ratesModel({
      ...req.body,
      ...{ userId: req.user._id },
    });
    newRateQuery.save();
    res.status(200).json(newRateQuery);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//update a rate
router.patch("/", authenticateToken, async (req, res) => {
  try {
    const userQuery = await ratesModel.findById(req.body.rateId);
    if (req.user.id !== userQuery.userId)
      return res.status(500).json({ meesage: "u can update your ratting" });
    const ratesQuery = await ratesModel.findOneAndUpdate(
      {
        _id: req.body.rateId,
      },
      { $set: { point: req.body.point } },
      { new: true }
    );
    res.status(200).json(ratesQuery);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete a rate
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const rateQuery = await ratesModel.findById(req.params.id);
    if (!rateQuery) {
      return res.status(500).json({ message: "dont have this id" });
    }
    if (rateQuery.userId !== req.user.id) {
      return res.status(500).json({ message: "u can delete only ur ratting" });
    }
    await rateQuery.deleteOne();
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
