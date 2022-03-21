const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    email: { type: String, max: 50, unique: true },
    password: { type: String },
    profilePicture: { type: String },
    favourites: { type: Array },
    isAdmin: { type: Boolean, default: false },
    sex: { type: Boolean },
    dateOfBirth: { type: Date },
    messageFromAdmin: { type: String },
    rates: { type: Array },
    reviews: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("usersModel", usersSchema);
