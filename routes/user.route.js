"use strict";

const express = require("express");
const checkUser = require("../middlewares/basic-auth");
const error500 = require("../error-handlers/500");

const router = express.Router();
const {
  signup,
  allUser,
  login,
  deleteUser,
  getUser,
  getProfile
} = require("../controllers/userController");
const bearerCheck = require("../middlewares/bearer-auth");

// Routes
router.get("/profile", bearerCheck, getProfile);
router.post("/signup", checkUser, signup);
router.post("/signIn", login);
router.get("/user", allUser);
router.get("/user/:id", getUser);

router.delete("/user/:id", error500, deleteUser);

module.exports = router;
