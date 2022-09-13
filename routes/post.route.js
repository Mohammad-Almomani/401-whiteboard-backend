"use strict";

const express = require("express");
const router = express.Router();
const error500 = require("../error-handlers/500");

const { Post, commentModel } = require("../models/index");

// Routes
router.get("/post", getPosts);
router.get("/post/:id", error500, getPost);
router.get("/fullPost", postWithComments);
router.post("/post", createPost);
router.put("/post/:id", error500, updatePost);
router.delete("/post/:id", error500, deletePost);

async function getPosts(req, res) {
  let allPosts = await Post.read();
  res.status(200).json({
    allPosts,
  });
}

async function getPost(req, res) {
  const id = req.params.id;
  const post = await Post.read(id);

  res.status(200).json(post);
}

async function createPost(req, res) {
  // console.log(req.body)
  const newPost = req.body;
  const post = await Post.create(newPost);
  // console.log(post.dataValues.id);
  res.status(201).json(post);
}

async function updatePost(req, res) {
  const id = req.params.id;
  const obj = req.body;

  const updatedPost = await Post.update(id, obj);
  res.status(202).json(updatedPost);
}

async function deletePost(req, res) {
  const id = req.params.id;
  await Post.delete(id);
  res.status(204).send("Post deleted successfully");
}

async function postWithComments(req, res) {
  const fullPost = await Post.readWithComments(commentModel);
  res.status(200).json(fullPost);
}

module.exports = router;
