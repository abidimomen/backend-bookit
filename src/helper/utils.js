const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(
      password,
      parseInt(process.env.SALT_WORK_FACTOR),
      function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      }
    );
  });

  return hashedPassword;
}

async function comparePassword(password, hash) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, hash, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

module.exports = { hashPassword, comparePassword };
