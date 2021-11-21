const mongoose = require("mongoose");

const GeoSchema = mongoose.Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number], //the type is an array of numbers
    index: "2dsphere",
  },
});

const Event = mongoose.model(
  "Event",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    location: {
      type: GeoSchema,
    },
    maxPart: {
      type: Number,
      required: true,
    },
    currentPart: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  })
);

exports.Event = Event;
