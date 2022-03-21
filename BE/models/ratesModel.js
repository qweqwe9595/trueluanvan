const mongoose = require("mongoose");

const ratesSchema = new mongoose.Schema(
  {
    movieId: { type: String },
    userId: { type: String, ref: "usersModel" },
    point: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ratesModel", ratesSchema);
