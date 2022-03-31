const express = require("express");
const http = require("http");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

//router
const authRouter = require("./routers/authRouter");
const ratesRouter = require("./routers/ratesRouter");
const userRouter = require("./routers/usersRouter");
const reviewsRouter = require("./routers/reviewsRouter");

mongoose.connect(process.env.connectString, { useNewUrlParser: true }, () => {
  console.log("connect to mongodb");
});

require("dotenv").config();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/rates", ratesRouter);
app.use("/api/reviews", reviewsRouter);

app.listen(5000, () => {
  console.log("running 5000");
});
