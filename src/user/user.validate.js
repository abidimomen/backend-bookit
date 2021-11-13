const Joi = require("joi");

const createUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
  firstName: Joi.string().max(50).required(),
  lastName: Joi.string().max(50).required(),
});

const loginUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
});

const createUser = (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  createUserSchema
    .validateAsync({ email, password, firstName, lastName })
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

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  loginUserSchema
    .validateAsync({ email, password })
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

module.exports = { createUser, loginUser };
