const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) return next();

  token = token.substring(7);

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded);
    // if (decoded.userType != userType)
    //   throw new Error("You are not authorized to do this action");
    next();
  } catch (ex) {
    console.log(9);
    res.status(400).send(ex.message);
  }
};
