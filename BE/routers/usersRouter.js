const router = require("express").Router();
const usersModal = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authentica");
require("dotenv").config();

//update user
router.patch("/:id", authenticateToken, async (req, res) => {
  try {
    const userQuery = await usersModal.findById(req.params.id);
    if (req.user[0]._id !== userQuery._id)
      return res.status(500).send("u only can update ur own account");
    const userUpdateQuery = await usersModal.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.status(200).json(userUpdateQuery);
  } catch (err) {
    res.status(500);
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    res.status(200).json({ message: "success", data: req.user });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
