const mongoose = require("mongoose");
const { Event } = require("./Event.js");

const Movie = Event.discriminator(
  "Movie",
  new mongoose.Schema({
    imdbRate: {
      type: String,
      required: true,
    },
    trailer: {
      type: String,
      required: true,
    },
    cinemaName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  })
);

exports.Movie = Movie;
