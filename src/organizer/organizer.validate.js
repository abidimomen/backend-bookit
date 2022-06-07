const Joi = require("joi");

const createOrganizerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .max(128)
    .required(),
  firstname: Joi.string().trim().max(50).required(),
  lastname: Joi.string().trim().max(50).required(),
  phone : Joi.number().required(),
  organization: Joi.string().trim().max(50).required(),
});

const loginOrganizerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .max(128)
    .required(),
});

const updateOrganizerSchema = Joi.object().keys({
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .max(128)
    .allow(""),
  firstname: Joi.string().trim().max(50).allow(""),
  lastname: Joi.string().trim().max(50).allow(""),
  phone : Joi.number().required(),
  organization: Joi.string().trim().max(50).required(),
});

const createOrganizer = (req, res, next) => {
  const { email, password, firstname, lastname,phone, organization } = req.body;
  createOrganizerSchema
    .validateAsync({ email, password, firstname, lastname ,phone, organization})
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

const loginOrganizer = (req, res, next) => {
  const { email, password } = req.body;
  loginOrganizerSchema
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

const updateOrganizer = (req, res, next) => {
  const { password, firstname, lastname ,phone, organization} = req.body;
  updateOrganizerSchema
    .validateAsync({ password, firstname, lastname ,phone, organization})
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

module.exports = { createOrganizer ,loginOrganizer,updateOrganizer};

