"use strict";

const express = require("express");
const cors = require("cors");
const app = express();
const error404 = require("./error-handlers/404");

const postRouts = require("./routes/post.route");

app.use(cors());
app.use(express.json());
app.use(postRouts);

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use("*", (req, res) => {
  error404("Invalid Route", req, res);
});

/* istanbul ignore next */
function start(port) {
  app.listen(port, () => console.log(`Hello from port: ${port}`));
}

module.exports = {
  start: start,
  app: app,
};
