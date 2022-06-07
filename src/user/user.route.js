const express = require("express");
const usersRouter = express.Router();
const {
  login,
  register,
  updateAccount,
  deleteAccount,
  getUsers,
  getUserById,
  IsUserVerified,
  confirmation,
  resetPass,
  forgotPass,
  envoyerEmailReinitialisation,
  reSendConfirmationEmail,
  updatePassword
} = require("./user.controller");
const { createUser, loginUser, updateUser } = require("./user.validate");
const { verifyToken } = require("../middleware/token");




/**
  * @swagger
  * tags:
  *   name: Users
  *   description: The users managing API
  */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     description: Get all Users
 *     responses:
 *       200:
 *         description: Success
 * 
 */
usersRouter.get("/", getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     description: Get user by id
 *     parameters:
 *      - name: id
 *        description: user id
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: user not found
 * 
 */




/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [Users]
 *     description: user login
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description : error
 * 
 */
usersRouter.post("/login", loginUser, login);

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     description: user register
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description : Email taken
 * 
 */
usersRouter.post("/register", createUser, register);

/**
 * @swagger
 * /users/:id:
 *   put:
 *     tags: [Users]
 *     description: modify user
 *     responses:
 *       200:
 *         description: Success
 * 
 */
usersRouter.put("/:id", verifyToken, updateUser, updateAccount);

/**
 * @swagger
 * /users:
 *   delete:
 *     tags: [Users]
 *     description: delete user
 *     responses:
 *       200:
 *         description: Success
 * 
 */
usersRouter.delete("/:id", verifyToken, deleteAccount);







usersRouter.get("/:id", getUserById);

usersRouter.get("/confirmation/:token",confirmation);
usersRouter.get("/isVerified/:id", IsUserVerified);

usersRouter.put("/resetPass",resetPass);
usersRouter.post("/forgotPassword",forgotPass);
usersRouter.post("/reSendConfirmationEmail",reSendConfirmationEmail);
usersRouter.put("/updatePassword",updatePassword);
//add verifyToken on protected routes
module.exports = { usersRouter };
