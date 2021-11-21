const userService = require("./user.service.js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, firstname, lastname, password } = req.body;
  try {
    const payload = await userService.register(
      email,
      firstname,
      lastname,
      password
    );
    return res.status(201).json({
      data: payload,
      message: "User created",
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
    const payload = await userService.login(email, password);
    let token = jwt.sign(
      { id: payload._id, email: payload.email },
      process.env.SECRET,
      {}
    );
    let auth = "Bearer " + token;
    res.setHeader("Authorization", auth);
    return res.status(200).send({ auth: true, token: auth });
  } catch (error) {
    if (String(error).includes("user not found")) {
      return res.status(404).json({
        error: true,
        message: "User not found",
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
  const { firstname, lastname, password } = req.body;
  try {
    const payload = await userService.updateAccount(id, {
      firstname,
      lastname,
      password,
    });
    return res.status(200).json({
      data: payload,
      message: "User updated",
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
    const payload = await userService.deleteAccount(id);
    return res.status(200).json({
      data: payload,
      message: "User deleted",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

module.exports = { register, login, updateAccount, deleteAccount };
