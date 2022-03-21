const router = require("express").Router();
const usersModal = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authentica");
require("dotenv").config();

//get all user
router.get("/", async (req, res) => {
  try {
    const usersQuery = await usersModal.find();
    res.send(usersQuery);
  } catch (err) {
    res.status(500);
  }
});

//update user
// router.patch("/:id", authenticateToken, async (req, res) => {
//   try {
//     const userQuery = await usersModal.findById(req.params.id);
//     if (req.user[0]._id !== userQuery._id)
//       return res.status(500).send("u only can update ur own account");
//     const userUpdateQuery = await usersModal.findOneAndUpdate(
//       { _id: req.params.id },
//       {
//         $set: req.body,
//       }
//     );
//     res.status(200).json(userUpdateQuery);
//   } catch (err) {
//     res.status(500);
//   }
// });

//login
router.post("/login", async (req, res) => {
  try {
    const userQuery = await usersModal.find({
      email: req.body.email,
      password: req.body.password,
    });
    if (userQuery.length !== 0) {
      const email = req.body.email;
      const token = jwt.sign({ email }, process.env.TOKEN_SR);
      res.status(200).json({ token: token });
    } else {
      res.status(500).json({ message: "wrong user" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500);
  }
});

//register
router.post("/register", async (req, res) => {
  try {
    const register = await new usersModal(req.body);
    await register.save();
    res.status(200).json({ userInfo: register });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
