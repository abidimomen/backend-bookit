const Joi = require("joi");

const createEventSchema = Joi.object().keys({
  title: Joi.string().max(128).required(),
  host: Joi.string().max(128).required(),
  date: Joi.date().required(),
  duration: Joi.number().required(),
  creationDate: Joi.date().required(),
  location: Joi.string().max(128).required(),
  maxPart: Joi.number().required(),
  currentPart: Joi.number().required(),
  rating: Joi.number().required(),
  description: Joi.string().max(128).required(),
  datalink: Joi.string().max(128).required(),
});

const creatingEvent = (req, res, next) => {
  
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
  createEventSchema
    .validateAsync({
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
    })
    .then((res) => {
      next();
    })
    .catch((error) => {
      return res.status(400).json({
        error: true,
        message: error,
      });
    });
};
module.exports = { creatingEvent };