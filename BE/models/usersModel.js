const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    userName: { type: String },
    email: { type: String, max: 50, unique: true },
    password: { type: String },
    img: { type: String },
    isAdmin: { type: Boolean, default: false },
    sex: { type: Boolean, default: true },
    dateOfBirth: { type: Date },
    rates: [{ type: String, ref: `ratesModel` }],
    reviews: [{ type: String, ref: `reviewsModel` }],
    polls: [{ type: String, ref: `pollsModel` }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("usersModel", usersSchema);
