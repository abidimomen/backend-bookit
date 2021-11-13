const express = require("express");
const usersRouter = express.Router();
const { login, register } = require("./user.controller");

usersRouter.get("/", login);
usersRouter.post("/", register);

module.exports = { usersRouter };

