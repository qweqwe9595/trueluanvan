const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    email: { type: String, max: 50, unique: true },
    password: { type: String },
    profilePicture: { type: String },
    favourites: { type: Array },
    isAdmin: { type: Boolean },
    sex: { type: Boolean },
    dateOfBirth: { type: Date },
    messageFromAdmin: { type: String },
  },
  { timestamps }
);

module.exports = mongoose.Schema("usersModel", usersSchema);
