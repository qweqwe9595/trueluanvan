const mongoose = require("mongoose");

const movieListSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "usersModel" },
    listName: { type: String, default: "watch later" },
    movies: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("movieListModel", movieListSchema);
