"use strict";

const Post = (sequelize, DataTypes) =>
  sequelize.define("post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

module.exports = Post;
