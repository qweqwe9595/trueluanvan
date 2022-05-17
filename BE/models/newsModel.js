const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "usersModel" },
    newsName: { type: String },
    newsShortContent: { type: String },
    contents: [
      {
        contentName: { type: String },
        contentImg: { type: String },
        contentText: { type: String },
      },
    ],
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("newsModel", newsSchema);
