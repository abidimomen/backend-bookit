const mongoose = require("mongoose");
const Organizer = mongoose.model(
  "Organizer",
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: Number,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    events:[{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Event'
    }]
  })
);

exports.Organizer = Organizer;
