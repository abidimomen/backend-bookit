const eventService = require("./event.service.js");

const createEvent = async (req, res) => {
  const {
    title,
    host,
    date,
    duration,
    creationDate,
    location,
    maxPart,
    currentPart,
    rating,
    description,
    datalink,
  } = req.body;
  try {
    const payload = await eventService.create(
        title,
        host,
        date,
        duration,
        creationDate,
        location,
        maxPart,
        currentPart,
        rating,
        description,
        datalink,
    );
    return res.status(201).json({
      data: payload,
      message: "Event created",
    });
  } catch (error) {
    if (String(error).includes("event exists")) {
      return res.status(400).json({
        error: true,
        message: "event exists ",
      });
    }
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};
module.exports = { createEvent };
