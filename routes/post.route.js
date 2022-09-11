'use strict';

const express = require('express');
const router = express.Router();

const {Post} = require('../models/index');

// Routes
router.get('/post', getPosts);
router.get('/post/:id', getPost);
// router.post('/food', createFood);
// router.delete('/food/:id', deleteFood);
// router.put('/food/:id', updateFood);

async function getPosts(req, res) {
  let allPosts = await Post.findAll();
  res.status(200).json({
    allPosts
  })
}

async function getPost(req, res) {
  const id = req.params.id;
  const post = await Post.findOne({
    where: {id: id}
  });
  res.status(200).json(Post)
}

async function createFood(req, res) {
  // console.log(req.body)
  const newFood = req.body;
  const food = await Food.create(newFood);
  res.status(201).json(food);
}

async function deleteFood(req, res) {
  const id = req.params.id;
  let deletedFood = await Food.destroy({
    where: {id: id}
  });
  res.status(204).json({deletedFood});
}


async function updateFood(req, res) {
  const id = req.params.id;
  const obj = req.body;

  // const food = await Food.findOne({
  //   where: {id: id}
  // });

  // const updatedFood = await food.update(obj);

  const updatedFood = await Food.update()

  res.status(200).json(updatedFood);
}

module.exports = router;