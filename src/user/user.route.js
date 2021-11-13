const express = require("express");
const usersRouter = express.Router();
const { login, register } = require("./user.controller");
const { createUser, loginUser } = require("./user.validate");
const { verifyToken } = require("../middleware/token");

usersRouter.post("/login", loginUser, login);
usersRouter.post("/register", createUser, register);
//add verifyTOken on protected routes
module.exports = { usersRouter };
