const { number } = require("joi");
const mongoose = require("mongoose");

// const baseOptions = {
//   discriminatorKey: '__type',
//   collection: 'Event'
// }

// const GeoSchema = mongoose.Schema({
//   type: {
//     type: String,
//     default: "Point",
//   },
//   coordinates: {
//     type: [Number], //the type is an array of numbers
//     index: "2dsphere",
//   },
// });

const Event = mongoose.model(
  "Event",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    creationDate: {
      type: Date,
      required: true,
    },
    // location: {
    //   type: GeoSchema,
    // },
    location: {
      type: String,
      required: true,
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
    description: {
      type: String,
      required: true,
    },
    datalink: {
      type: String,
    },
    image: {
      type: String,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer",
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    eventtype: [{ type: String }],
  })
);

exports.Event = Event;
