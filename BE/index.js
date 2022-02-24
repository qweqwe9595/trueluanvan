const express = require("express");
const http = require("http");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.connectString, { useNewUrlParser: true }, () => {
  console.log("connect to mongodb");
});

app.listen(5000, () => {
  console.log("running 5000");
});
  