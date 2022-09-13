"use strict";

const { Post } = require("../models/index");

/*eslint-disable no-unused-vars*/
module.exports = async (req, res, next) => {
  let id = req.params.id;
  if (isNaN(id)) id = -1;

  const post = await Post.read(id);

  if (!post) {
    res.status(500).send({
      code: 500,
      message: isNaN(req.params.id)
        ? `${req.params.id} is not a valid ID`
        : `Post ${req.params.id} not found`,
    });
  } else next();
};
