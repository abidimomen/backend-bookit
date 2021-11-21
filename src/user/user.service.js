const { User } = require("../models/User");
const { hashPassword, comparePassword } = require("../helper/utils");

const register = async (email, firstname, lastname, password) => {
  try {
    const userExists = await User.findOne({
      email: email,
    });
    if (userExists) {
      throw new Error("email taken");
    } else {
      const passwordHashed = await hashPassword(password);
      let user = new User({
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: passwordHashed,
      });
      await user.save();
      return await User.findOne({
        email: email,
      });
    }
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const userExists = await User.findOne({
      email: email,
    }).select("+password");
    if (!userExists) {
      throw new Error("user not found");
    } else {
      const passwordMatch = await comparePassword(
        password,
        userExists.password
      );
      if (passwordMatch) {
        delete userExists.password;
        return userExists;
      } else {
        throw new Error("wrong credentials");
      }
    }
  } catch (error) {
    throw error;
  }
};

const updateAccount = async (id, input) => {
  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      throw new Error("user not found");
    } else {
      for (const key in input) {
        if (input[key] !== undefined && input[key].length !== 0) {
          // the attributes to update are the strings with a positive length
          if (key === "password") {
            /**
             * in case we will update the password then we will
             * save the new password hash with md5
             */
            userExists.password = hashPassword(input[key]);
          } else {
            userExists[key] = input[key];
          }
        }
      }
      await User.findByIdAndUpdate(id, userExists);
    }
  } catch (error) {
    throw error;
  }
};

const deleteAccount = async (id) => {
  try {
    await User.findByIdAndRemove(id);
  } catch (error) {
    throw error;
  }
};
module.exports = { register, login, updateAccount, deleteAccount };
