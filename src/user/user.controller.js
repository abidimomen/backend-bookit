const userService = require("./user.service.js");
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
    console.log(error);
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const payload = await userService.login(email, password);
  return res.status(201).json({
    data: payload,
    message: "User created",
  });
};

module.exports = { register, login };
