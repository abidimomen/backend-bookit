const express = require("express");
const eventsRouter = express.Router();
const { createEvent } = require("./event.controller");
const { creatingEvent } = require("./event.validate");

eventsRouter.post("/createEvent", creatingEvent, createEvent);

//add verifyToken on protected routes
module.exports = { eventsRouter };
