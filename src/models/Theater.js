const mongoose = require("mongoose");
const { Event } = require("./Event.js");

const Theater = Event.discriminator(
  "Theater",
  new mongoose.Schema({
    theaterName: {
      type: String,
      required: true,
    },
  })
);

exports.Theater = Theater;
