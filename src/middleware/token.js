const jwt = require("jsonwebtoken");

/* verify the token sent by the frontend in order to validate most
of the http requests*/
const verifyToken = (req, res, next) => {
  // get token from the header and remove the bearer from start
  let auth = req.headers["authorization"];
  let token = auth.split(" ")[1];
  if (token == null)
    return res.status(401).json({ auth: false, message: "No token provided." });
  // check token using the Secret word for security measures
  jwt.verify(token, process.env.SECRET, (err, res) => {
    if (err)
      return res.status(403).json({ auth: false, message: "Forbidden." });
    if (res) next();
  });
};

module.exports = { verifyToken };
