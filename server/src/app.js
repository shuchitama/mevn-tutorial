const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://shuchita:sillyPassword@cluster0-tfaqk.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Connection Succeeded");
});

const Post = require("../models/post");

app.get("/posts", (req, res) => {
  res.send([
    {
      id: 1,
      title: "Hello World!",
      description: "Hi there! How are you?"
    },
  ]);
});

// Add new post
app.post("/posts", (req, res) => {
  const db = req.db;
  const title = req.body.title;
  const description = req.body.description;
  const new_post = new Post({
    // id: id,
    title: title,
    description: description
  });

  new_post.save(function (error) {
    if (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error: Post was not saved"
      });
      return;
    } else {
      res.send({
        success: true,
        message: "Post saved successfully!"
      });
    }
  });
});

app.listen(process.env.PORT || 8081, () => {
  console.log(`Example app listening on port ${process.env.PORT || 8081}!`);
});
