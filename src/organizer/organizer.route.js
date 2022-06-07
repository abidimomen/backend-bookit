const express = require("express");
const organizersRouter = express.Router();
const {
  register,
  login,
  updateAccount,
  deleteAccount,
  getOrganizerEvents,
  newOrganizerEvents,
  getOrganizers,
  getOrganizerById

} = require("./organizer.controller");
const { createOrganizer , loginOrganizer,updateOrganizer} = require("./organizer.validate");
const { verifyToken } = require("../middleware/token");


/**
  * @swagger
  * tags:
  *   name: Organizers
  *   description: The organizers managing API
  */


/**
 * @swagger
 * /organizers:
 *   get:
 *     tags: [Organizers]
 *     description: Get all Organizes
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 * 
 */
organizersRouter.get("/", getOrganizers);


/**
 * @swagger
 * /organizers/{id}:
 *   get:
 *     tags: [Organizers]
 *     description: Get organizer by id
 *     parameters:
 *      - name: id
 *        description: organizer id
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: organizer not found
 * 
 */
organizersRouter.get("/:id", getOrganizerById);


/**
 * @swagger
 * /organizers/login:
 *   post:
 *     tags: [Organizers]
 *     description: organizer login
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description : organizer not found 
 *       500:
 *         description : wrong credentials
 * 
 */
organizersRouter.post("/login", loginOrganizer, login);


/**
 * @swagger
 * /organizers:
 *   post:
 *     tags: [Organizers]
 *     description: organizer register
 *     responses:
 *       201:
 *         description: Organizer created
 *       400:
 *         description : Email taken
 * 
 */
organizersRouter.post("/register", createOrganizer, register);


/**
 * @swagger
 * /organizers/{id}:
 *   put:
 *     tags: [Organizers]
 *     description: modify organizer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 * 
 */
organizersRouter.put("/:id", verifyToken, updateOrganizer, updateAccount);

/**
 * @swagger
 * /organizers/{id}:
 *   delete:
 *     parameters:
 *      - name: id
 *        description: organizer id
 *        in: path
 *        required: true
 *        type: string
 *     tags: [Organizers]
 *     description: delete organizer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 * 
 */
organizersRouter.delete("/:id", verifyToken, deleteAccount);
//problem in delete


/**
 * @swagger
 * /organizers/{id}/events:
 *   get:
 *     parameters:
 *      - name: id
 *        description: organizer id
 *        in: path
 *        required: true
 *        type: string
 *     tags: [Organizers]
 *     description: get events by organizer organizer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 * 
 */
organizersRouter.get("/:id/events",getOrganizerEvents);


organizersRouter.post("/:id/events,newOrganizerEvent");
//add verifyToken on protected routes
module.exports = { organizersRouter };
