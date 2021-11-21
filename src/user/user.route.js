const express = require("express");
const usersRouter = express.Router();
const {
  login,
  register,
  updateAccount,
  deleteAccount,
} = require("./user.controller");
const { createUser, loginUser, updateUser } = require("./user.validate");
const { verifyToken } = require("../middleware/token");

usersRouter.post("/login", loginUser, login);
usersRouter.post("/register", createUser, register);
usersRouter.put("/:id", verifyToken, updateUser, updateAccount);
usersRouter.delete("/:id", verifyToken, deleteAccount);
//add verifyToken on protected routes
module.exports = { usersRouter };
