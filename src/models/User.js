const { number, boolean } = require("joi");
const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
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
    isVerified: {
      type: Number,
      // required: true,
      select: true,
    },

    events:[{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Event'
    }]
  })
);

exports.User = User;
