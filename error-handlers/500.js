"use strict";

const { Post, Comment, Users } = require("../models/index");

/*eslint-disable no-unused-vars*/
module.exports = async (req, res, next) => {
  let id = req.params.id || null;
  let routCheck = req.url;

  if (isNaN(id)) id = -1;

  let rout;
  routCheck.includes("post") ? rout=await Post.read(id) : routCheck.includes("user")? rout=await Users.findOne({where: {id : id}}): rout=await Comment.read(id);
  // const post = await Post.read(id);
  // const comment = await Comment.read(id);

  if (!rout) {
    return res.status(500).send({
      code: 500,
      message: isNaN(req.params.id)
        ? `${req.params.id} is not a valid ID`
        : `${routCheck.includes("post") ? "Post": routCheck.includes("user")? "user":"Comment"} ${req.params.id} not found`,
    });
  } else next();
};
