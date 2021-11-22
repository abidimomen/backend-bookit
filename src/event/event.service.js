//const { CustomEvent } = require("../models/CustomEvent");
const { Event } = require("../models/Event");

const create = async (title,
  host,
  date,
  duration,
  creationDate,
  location,
  maxPart,
  currentPart,
  rating,
  description,
  datalink,) => {
  try {
    const eventExists = await Event.findOne({
      title: title,
    });
    if (eventExists) {
      throw new Error("event exists");
    } else {
      let event = new Event({
        title: title,
        host: host,
        date: date,
        duration: duration,
        creationDate: creationDate,
        location: location,
        maxPart: maxPart,
        currentPart: currentPart,
        rating: rating,
        description: description,
        datalink: datalink,
      });
      await event.save();
      return await Event.findOne({
        title: title,
      });
    }
  } catch (error) {
    throw error;
  }
};
module.exports = { create };
