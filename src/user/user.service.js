const { User } = require("../models/User");
const register = async (email, firstname, lastname, password) => {
  console.log(email);
  try {
    const userExists = await User.findOne({
      email: email,
    });
    console.log(userExists);
    if (userExists) {
      return;
    } else {
      let user = new User({
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: password,
      });
      return await user.save();
    }
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {};
module.exports = { register, login };
