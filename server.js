'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

const foodRouter = require('./routes/post.route');

app.use(cors());
app.use(express.json());
app.use(foodRouter);

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
})

function start(port) {
  app.listen(port, () => console.log(`Hello from port: ${port}`));
}

module.exports = {
  start
};