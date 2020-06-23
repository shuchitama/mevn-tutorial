const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/posts");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Connection Succeeded");
});

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.send([
    {
      id: 1,
      title: "Hello World!",
      description: "Hi there! How are you?",
    },
  ]);
});

app.listen(process.env.PORT || 8081, () => {
  console.log(`Example app listening on port ${process.env.PORT || 8081}!`);
});
