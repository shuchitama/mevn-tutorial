const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

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
