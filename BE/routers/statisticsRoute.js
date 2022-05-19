const router = require("express").Router();
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authentica");
const ratesModel = require("../models/ratesModel");
const reviewsModel = require("../models/reviewModel");
const usersModel = require("../models/usersModel");
const newsModel = require("../models/newsModel");
require("dotenv").config();

const fillterDay = (query) => {
  const today = new Date();
  return (
    query.reduce((prev, curr) => {
      if (
        new Date(curr.createdAt).toDateString("en-US") ===
        today.toDateString("en-US")
      ) {
        return prev + 1;
      }
      return prev;
    }, 0) || 0
  );
};

const fillterAmountOfTime = (query, time) => {
  const today = new Date().getTime();

  return (
    query.reduce((prev, curr) => {
      if (today - new Date(curr.createdAt).getTime() <= time) {
        return prev + 1;
      }
      return prev;
    }, 0) || 0
  );
};

const fillterMonth = (query) => {
  const today = new Date();
  let month = [];
  let monthNow = today.getMonth() + 1;
  for (let i = 0; i < 6; i++) {
    if (monthNow == 0) {
      monthNow = 12;
    }
    month.push(monthNow.toString());
    monthNow--;
  }
  const obj = [];
  month.forEach((item) => {
    obj.push(
      query.reduce((prev, curr) => {
        if (new Date(curr.createdAt).getMonth() + 1 == item) {
          return prev + 1;
        }
        return prev;
      }, 0) || 0
    );
  });
  return obj;
};

//rating
router.get("/rates", async (req, res) => {
  if (Object.keys(req.query.query).length === 0)
    return res.status(400).json({ message: "need query" });
  try {
    let ratesQuery = await ratesModel.find().select("createdAt");

    switch (req.query.query) {
      case "day": {
        ratesQuery = fillterDay(ratesQuery);
        break;
      }
      case "week": {
        ratesQuery = fillterAmountOfTime(ratesQuery, 604800000);
        break;
      }
      case "month": {
        ratesQuery = fillterMonth(ratesQuery);
        break;
      }
      case "year": {
        ratesQuery = fillterAmountOfTime(ratesQuery, 3.1556926 * 10000000000);
        break;
      }
    }
    res.status(200).json({ ratesQuery });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//review
router.get("/reviews", async (req, res) => {
  if (Object.keys(req.query.query).length === 0)
    return res.status(400).json({ message: "need query" });
  try {
    let reviewsQuery = await reviewsModel.find().select("createdAt");

    switch (req.query.query) {
      case "day": {
        reviewsQuery = fillterDay(reviewsQuery);
        break;
      }
      case "week": {
        reviewsQuery = fillterAmountOfTime(reviewsQuery, 604800000);
        break;
      }
      case "month": {
        reviewsQuery = fillterMonth(reviewsQuery);
        break;
      }
      case "year": {
        reviewsQuery = fillterAmountOfTime(
          reviewsQuery,
          3.1556926 * 10000000000
        );
        break;
      }
    }
    res.status(200).json({ reviewsQuery });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//new user
router.get("/users", async (req, res) => {
  if (Object.keys(req.query.query).length === 0)
    return res.status(400).json({ message: "need query" });
  try {
    let usersQuery = await usersModel.find().select("createdAt");

    switch (req.query.query) {
      case "day": {
        usersQuery = fillterDay(usersQuery);
        break;
      }
      case "week": {
        usersQuery = fillterWeek(usersQuery);
        break;
      }
      case "month": {
        usersQuery = fillterMonth(usersQuery);
        console.log(usersQuery);
        break;
      }
    }
    res.status(200).json({ usersQuery });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//news
router.get("/news", async (req, res) => {
  if (Object.keys(req.query.query).length === 0)
    return res.status(400).json({ message: "need query" });
  try {
    let newsQuery = await newsModel.find().select("createdAt");

    switch (req.query.query) {
      case "day": {
        newsQuery = fillterDay(newsQuery);
        break;
      }
      case "week": {
        newsQuery = fillterAmountOfTime(newsQuery, 604800000);
        break;
      }
      case "month": {
        newsQuery = fillterMonth(newsQuery);
        break;
      }
      case "year": {
        newsQuery = fillterAmountOfTime(newsQuery, 3.1556926 * 10000000000);
        break;
      }
    }
    res.status(200).json({ newsQuery });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//get top user rates
router.get("/toprate", async (req, res) => {
  try {
    const userQuery = await usersModel.find();

    const sort = userQuery.sort((a, b) => {
      return b.rates.length - a.rates.length;
    });

    res.status(200).json(sort);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
//get top user reviews
router.get("/topreview", async (req, res) => {
  try {
    const userQuery = await usersModel.find();
    const sort = userQuery.sort((a, b) => {
      return b.reviews.length - a.reviews.length;
    });
    res.status(200).json(sort);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
