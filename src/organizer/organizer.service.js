const { Organizer } = require("../models/Organizer");
const { hashPassword, comparePassword } = require("../helper/utils");

const register = async (email, firstname, lastname, password, phone, organization) => {
  try {
    const organizerExists = await Organizer.findOne({
      email: email,
    });
    if (organizerExists) {
      throw new Error("email taken");
    } else {
      const passwordHashed = await hashPassword(password);
      let organizer = new Organizer({
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: passwordHashed,
        phone : phone ,
        organization: organization,
      });
      await organizer.save();
      return await Organizer.findOne({
        email: email,
      });
    }
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const organizerExists = await Organizer.findOne({
      email: email,
    }).select("+password");
    if (!organizerExists) {
      throw new Error("organizer not found");
    } else {
      const passwordMatch = await comparePassword(
        password,
        organizerExists.password
      );
      if (passwordMatch) {
        delete organizerExists.password;
        return organizerExists;
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
    const organizerExists = await Organizer.findById(id);
    if (!organizerExists) {
      throw new Error("organizer not found");
    } else {
      for (const key in input) {
        if (input[key] !== undefined && input[key].length !== 0) {
          // the attributes to update are the strings with a positive length
          if (key === "password") {
            /**
             * in case we will update the password then we will
             * save the new password hash with md5
             */
            organizerExists.password = hashPassword(input[key]);
          } else {
            organizerExists[key] = input[key];
          }
        }
      }
      await Organizer.findByIdAndUpdate(id, organizerExists);
    }
  } catch (error) {
    throw error;
  }
};

const getOrganizers = async () => {
  try {
    

    return await Organizer.find().populate("events");
    Organizer.find
  } catch (error) {
    throw error;
  }
};

const deleteAccount = async (id) => {
  try {
    await Organizer.findByIdAndRemove(id);
  } catch (error) {
    throw error;
  }
};
const  getOrganizerById = async(id)=>  {
  try {
    const doesOrganizerExist = await Organizer.findById(id);
    if (doesOrganizerExist === undefined) throw new Error("Organizer not found");
    return doesOrganizerExist;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = { register ,login ,updateAccount, deleteAccount,getOrganizers,getOrganizerById};
// module.exports = { register, login, updateAccount, deleteAccount };
