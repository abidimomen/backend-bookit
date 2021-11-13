const mongoose = require("mongoose");

async function connect() {
  try {
    mongoose.connect(
      process.env.URI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );
  } catch (error) {
    console.log("connection failed");
  }
}

module.exports = { connect };
