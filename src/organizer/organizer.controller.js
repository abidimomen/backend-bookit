const organizerService = require("./organizer.service.js");
const jwt = require("jsonwebtoken");
const { Organizer } = require("../models/Organizer.js");
const { Event } = require("../models/Event.js");

const register = async (req, res) => {
  const { email, firstname, lastname, password, phone, organization } =
    req.body;
  try {
    const payload = await organizerService.register(
      email,
      firstname,
      lastname,
      password,
      phone,
      organization
    );
    return res.status(201).json({
      data: payload,
      message: "organizer created",
    });
  } catch (error) {
    if (String(error).includes("email taken")) {
      return res.status(400).json({
        error: true,
        message: "Email is taken",
      });
    }
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const payload = await organizerService.login(email, password);
    // let token = jwt.sign(
    //   { id: payload._id, email: payload.email },
    //   process.env.SECRET,
    //   {}
    // );
    // let auth = "Bearer " + token;
    // res.setHeader("Authorization", auth);
    // return res.status(200).send({ auth: true, token: auth });
    
    return res.status(200).send({payload});
  } catch (error) {
    if (String(error).includes("organizer not found")) {
      return res.status(404).json({
        error: true,
        message: "Organizer not found",
      });
    } else if (String(error).includes("wrong credentials")) {
      return res.status(500).json({
        error: true,
        message: "email/password incorrect",
      });
    } else {
      return res.status(500).json({
        error: true,
        message: error,
      });
    }
  }
};

const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, password, phone, organization } = req.body;
  try {
    const payload = await organizerService.updateAccount(id, {
      firstname,
      lastname,
      password,
      phone,
      organization,
    });
    return res.status(200).json({
      data: payload,
      message: "organizer updated",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const deleteAccount = async (req, res) => {
  const { id } = req.params;
  try {
    const payload = await OrganizerService.deleteAccount(id);
    return res.status(200).json({
      data: payload,
      message: "Organizer deleted",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const getOrganizerEvents = async (req,res,next) => {
  const { id} = req.params;
  const organizer = await Organizer.findById(id);
  console.log('organizer' , organizer);
}

const newOrganizerEvents = async(req,res,next ) => {

}

const getOrganizers = async (req, res) => {
  try {
    const payload = await organizerService.getOrganizers();
    return res.status(200).json({
      data: payload,
      message: "list all organizers",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }};

  const getOrganizerById = async (req, res) => {
    const id = req.params.id;
    try {
      const payload = await organizerService.getOrganizerById(id);
      return res.status(200).json({
        data: payload,
        message: "list organizer",
      });
    } catch (error) {
      if (String(error).includes("not found")) {
        return res.status(404).json({
          error: true,
          message: "organizer not found",
        });
      } else {
        return res.status(500).json({
          error: true,
          message: error,
        });
      }
    }
  };

module.exports = { register, login ,updateAccount, deleteAccount,getOrganizerEvents,newOrganizerEvents,getOrganizers,getOrganizerById};
// module.exports = { register, login, updateAccount, deleteAccount };
