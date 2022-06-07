const express = require("express");
const { connect } = require("./src/config/database");
const { usersRouter } = require("./src/user/user.route");
const { eventsRouter } = require("./src/event/event.route");
const { organizersRouter } = require("./src/organizer/organizer.route");
const path = require('path')
require("dotenv/config");
const morgan = require("morgan")
//middleware


const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "bookit",
      description: "Bookit information",
      contact: {
        name: "bookit application",
      },
      server: ["http://localhost:3000"],
    }
  },
  apis: ["./src/user/user.route.js","./src/organizer/organizer.route.js","./src/event/event.route.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
//console.log(swaggerDocs);
//console.log(swaggerOptions);
const port =  process.env.PORT || 3000;
 
(async () => {
  try {
    await connect();
  } catch (error) {
    console.log(error);
  }
  const app = express();
  app.use(morgan('dev'))
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );
  app.use('/uploads',express.static(path.join(__dirname,'uploads')))

  

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.use("/users", usersRouter);
  app.use("/events", eventsRouter);
  app.use("/organizers", organizersRouter);
  app.listen(port, () => {
    console.log("server is running on http://localhost:3000");
  });
})();
