const Joi = require("joi");

const createUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .max(128)
    .required(),
  firstname: Joi.string().trim().max(50).required(),
  lastname: Joi.string().trim().max(50).required(),
});

const loginUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .max(128)
    .required(),
});

const updateUserSchema = Joi.object().keys({
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .max(128)
    .allow(""),
  firstname: Joi.string().trim().max(50).allow(""),
  lastname: Joi.string().trim().max(50).allow(""),
});

const createUser = (req, res, next) => {
  const { email, password, firstname, lastname } = req.body;
  createUserSchema
    .validateAsync({ email, password, firstname, lastname })
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

const updateUser = (req, res, next) => {
  const { password, firstname, lastname } = req.body;
  updateUserSchema
    .validateAsync({ password, firstname, lastname })
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

module.exports = { createUser, loginUser, updateUser };
