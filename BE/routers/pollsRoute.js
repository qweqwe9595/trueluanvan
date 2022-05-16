const router = require("express").Router();
const pollModule = require("../models/pollsModel");
const pollsModel = pollModule.pollsModel;
const pollvoteModel = pollModule.pollvoteModel;
const optionsModel = pollModule.optionsModel;

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

//get all
router.get("/getall", async (req, res) => {
  try {
    const pollsQuery = await pollsModel.find().populate({
      path: "options",
      //   populate: {
      //     path: "optionVotes",
      //   },
    });
    res.status(200).json(pollsQuery);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//get one
router.get("/getone/:id", async (req, res) => {
  try {
    const pollsQuery = await pollsModel.findById(req.params.id).populate({
      path: "options",
      populate: {
        path: "optionVotes",
      },
    });
    res.status(200).json(pollsQuery);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//create a polls
router.post(
  "/createone",
  [authenticateToken, upload.single("pollImg")],
  async (req, res) => {
    try {
      const pollsQuery = await new pollsModel(req.body);
      if (req.file) {
        pollsQuery.pollImg = req.file.filename;
      }
      await pollsQuery.save();
      res.status(200).json(pollsQuery);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);

//add question for polls
router.post(
  "/addoptions",
  [authenticateToken, upload.single("optionImg")],
  async (req, res) => {
    try {
      const optionQuery = await new optionsModel(req.body);
      await pollsModel.findByIdAndUpdate(req.body.pollId, {
        $push: { options: optionQuery._id },
      });
      if (req.file) {
        optionQuery.optionImg = req.file.filename;
      }
      await optionQuery.save();
      res.status(200).json(optionQuery);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);

//add a vote
router.post("/addvote", authenticateToken, async (req, res) => {
  try {
    let voted = false;

    const option = await optionsModel.findById(req.body.optionId);

    const poll = await pollsModel.findById(option.pollId);

    const pollVoteQuery = await new pollvoteModel({
      ...req.body,
      userId: req.user._id,
    });

    poll?.options?.forEach(async (item) => {
      const optionQuery = await optionsModel
        .findById(item)
        .populate("optionVotes");
      voted = optionQuery.optionVotes.find(
        (item) => item.userId === req.user._id.toString()
      );
    });
    await optionsModel.findByIdAndUpdate(req.body.optionId, {
      $push: { optionVotes: pollVoteQuery._id },
    });
    await pollVoteQuery.save();
    res.status(200).json({ pollVoteQuery, voted });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//update a polls
router.patch(
  "/updateone/:id",
  [authenticateToken, upload.single("pollImg")],
  async (req, res) => {
    try {
      const pollsQuery = await pollsModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      console.log(req.body);
      if (req.file) {
        pollsQuery.pollImg = req.file.filename;
        await pollsQuery.save();
      }
      res.status(200).json(pollsQuery);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);

//update a options
router.patch(
  "/options/updateone/:id",
  [authenticateToken, upload.single("optionImg")],
  async (req, res) => {
    try {
      const optionsQuery = await optionsModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      if (req.file) {
        optionsQuery.optionImg = req.file.filename;
        await optionsQuery.save();
      }
      res.status(200).json(optionsQuery);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);

//delete poll
router.delete("/deleteone/:id", authenticateToken, async (req, res) => {
  try {
    const pollsQuery = await pollsModel.findByIdAndDelete(req.params.id);
    res.status(200).json(pollsQuery);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//delete options
router.delete("/options/deleteone/:id", authenticateToken, async (req, res) => {
  try {
    const optionsQuery = await optionsModel.findByIdAndDelete(req.params.id);
    res.status(200).json(optionsQuery);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
