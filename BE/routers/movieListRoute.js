const router = require("express").Router();
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authentica");
require("dotenv").config();
const movieListModel = require("../models/movieListModel");

//get all rates
router.get("/getall", async (req, res) => {
  try {
    const movieQuery = await movieListModel.find();
    res.status(200).json(movieQuery);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all list of a user
router.get("/getuserlist", authenticateToken, async (req, res) => {
  try {
    //check if dont have default list
    const movieDefaultQuery = await movieListModel.find({
      userId: req.user._id,
      listName: "watch later",
    });
    if (movieDefaultQuery.length === 0) {
      const movieDefaultQuery = await new movieListModel({
        userId: req.user._id.toString(),
        listName: "watch later",
        movies: [],
      });
      await movieDefaultQuery.save();
    }
    const movieQuery = await movieListModel.find({ userId: req.user._id });
    res.status(200).json(movieQuery);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a default list
router.get("/getdefault", authenticateToken, async (req, res) => {
  try {
    const movieDefaultQuery = await movieListModel.find({
      userId: req.user._id,
      listName: "watch later",
    });
    if (movieDefaultQuery.length === 0) {
      const movieDefaultQuery = await new movieListModel({
        userId: req.user._id.toString(),
        listName: "watch later",
        movies: [],
      });
      await movieDefaultQuery.save();
    }
    const movieQuery = await movieListModel.findOne({
      userId: req.user._id,
      listName: "watch later",
    });
    res.status(200).json(movieQuery);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a list
router.post("/createone", authenticateToken, async (req, res) => {
  try {
    const movieQuery = await new movieListModel({
      ...req.body,
      ...{ userId: req.user._id },
    });
    await movieQuery.save();
    res.status(200).json(movieQuery);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update

//push a movie in
router.patch("/pushmovie/:id", async (req, res) => {
  try {
    const movieQuery = await movieListModel.findById(req.params.id);
    if (movieQuery.movies.includes(req.body.movieId)) {
      return res.status(200).json({ message: "already in" });
    } else {
      const movieQuery = await movieListModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: { movies: req.body.movieId },
        },
        { new: true }
      );
      return res.status(200).json(movieQuery);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// pull a movie out
router.patch("/pullmovie/:id", async (req, res) => {
  try {
    const movieQuery = await movieListModel.findById(req.params.id);
    if (!movieQuery.movies.includes(req.body.movieId)) {
      return res.status(200).json({ message: "dont have" });
    } else {
      const movieQuery = await movieListModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { movies: req.body.movieId },
        },
        { new: true }
      );
      return res.status(200).json(movieQuery);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a movie list
router.delete("/delete/:id", async (req, res) => {
  try {
    const movieQuery = await movieListModel.findByIdAndDelete(req.params.id);
    res.status(200).json(movieQuery);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
