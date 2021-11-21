const mongoose = require("mongoose");
const { Event } = require("./Event.js");

const CustomEvent = Event.discriminator(
  "CustomEvent",
  new mongoose.Schema({
    description: {
      type: String,
      required: true,
    },
  })
);

exports.CustomEvent = CustomEvent;
