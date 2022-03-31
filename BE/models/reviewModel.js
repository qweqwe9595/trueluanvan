const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema(
  {
    movieId: { type: String },
    movie: {},
    userId: { type: String, ref: "usersModel" },
    review: { type: String },
    rate: { type: String, ref: "ratesModel" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reviewsModel", reviewsSchema);
