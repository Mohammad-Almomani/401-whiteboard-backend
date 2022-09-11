'use strict';

const express = require('express');
const router = express.Router();

const {Food} = require('../models/index');

// Routes
router.get('/food', getFood);


async function getFood(req, res) {
  let food = await Food.findAll();
  res.status(200).json({
    food
  })
}

module.exports = router;