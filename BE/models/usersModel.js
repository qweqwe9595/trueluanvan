const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    userName: { type: String },
    email: { type: String, max: 50, unique: true },
    password: { type: String },
    img: { type: String },
    isAdmin: { type: Boolean, default: false },
    sex: { type: Boolean },
    dateOfBirth: { type: Date },
    messageFromAdmin: { type: String },
    rates: { type: Array },
    reviews: { type: Array },
    polls:[{type:String,ref:`pollsModel`}]
  },
  { timestamps: true }
);

module.exports = mongoose.model("usersModel", usersSchema);
