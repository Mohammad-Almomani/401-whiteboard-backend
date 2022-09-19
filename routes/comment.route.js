const express = require("express");
/*eslint-disable*/
const router = express.Router();
const error500 = require("../error-handlers/500");

const { Comment } = require("../models/index");

// Routes
router.get("/comment", getComments);
router.get("/comment/:id", error500, getOneComment);
router.post("/comment", createComment);
router.put("/comment/:id", error500, updateComment);
router.delete("/comment/:id", error500, deleteComment);

async function getComments(req, res) {
  let allComments = await Comment.read();
  return res.status(200).json({
    allComments,
  });
}
/* istanbul ignore next */
async function getOneComment(req, res) {
  const id = req.params.id;
  const comment = await Comment.read(id);

  return res.status(200).json(comment);
}


async function createComment(req, res) {
  // console.log(req.body)
  const newComment = req.body;
  const comment = await Comment.create(newComment);
  // console.log(comment.postID);
  const postComments = await Comment.readComments(comment.postID);
  // console.log(post.dataValues.id);
  return res.status(201).json(postComments);
}

/* istanbul ignore next */
async function updateComment(req, res) {
  const id = req.params.id;
  const obj = req.body;

  const comment = await Comment.update(id, obj);
  return res.status(202).json(comment);
}

async function deleteComment(req, res) {
  const id = req.params.id;
  await Comment.delete(id);
  return res.status(204).send("Post deleted successfully");
}

module.exports = router;
