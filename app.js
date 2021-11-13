const express = require("express");
const { connect } = require("./src/config/database");
const morgan = require("morgan");
const { usersRouter } = require("./src/user/user.route");
require("dotenv/config");
//middleware

(async () => {
  try {
    await connect();
  } catch (error) {
    console.log(error);
  }
  const app = express();
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );
  app.use(morgan("tiny"));
  app.use("/users", usersRouter);
  app.listen(3000, () => {
    console.log("server is running on http://localhost:3000");
  });
})();
