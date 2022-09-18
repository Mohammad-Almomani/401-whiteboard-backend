"use strict";

const express = require("express");
const checkUser = require("../middlewares/checkUserAuth");
const router = express.Router();
const {
  signup,
  allUser,
  login,
  deleteUser,
} = require("../controllers/userController");

// Routes
router.post("/signup", checkUser, signup);
router.post("/signIn", login);
router.get("/users", allUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
