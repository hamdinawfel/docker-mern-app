const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");

const postRouter = require("./routes/postRouter");
const userRouter = require("./routes/userRouter");

const app = express();
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const connectWithRetry = () => {
  mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("succesfully connected to DB"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello work fine!!!");
});

app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
