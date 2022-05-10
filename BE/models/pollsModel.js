const mongoose = require("mongoose");

const pollsSchema = new mongoose.Schema(
  {
    pollsName: { type: String },
    pollDesc: { type: String },
    pollImg: { type: String },
    options: [{ type: String, ref: `optionsModel` }],
  },
  { timestamps: true }
);

const optionsSchema = new mongoose.Schema(
  {
    pollId: { type: String, ref: "pollsModel" },
    optionName: { type: String },
    optionImg: { type: String },
    optionVotes: [{ type: String, ref: "pollvoteModel" }],
  },
  { timestamps: true }
);

const pollvoteSchema = new mongoose.Schema(
  {
    userId: { type: String },
    optionId: { type: String, ref: `optionsModel` },
  },
  { timestamps: true }
);

exports.pollsModel = mongoose.model("pollsModel", pollsSchema);
exports.pollvoteModel = mongoose.model("pollvoteModel", pollvoteSchema);
exports.optionsModel = mongoose.model("optionsModel", optionsSchema);
