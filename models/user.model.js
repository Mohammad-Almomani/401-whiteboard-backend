"use strict";

const User = (sequelize, DataTypes) =>
  sequelize.define("postUsers", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

module.exports = User;
