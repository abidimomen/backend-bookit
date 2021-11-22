const express = require("express");
const { connect } = require("./src/config/database");
const { usersRouter } = require("./src/user/user.route");
const { eventsRouter } = require("./src/event/event.route");
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
  app.use("/users", usersRouter);
  app.use("/events", eventsRouter);
  app.listen(3000, () => {
    console.log("server is running on http://localhost:3000");
  });
})();
