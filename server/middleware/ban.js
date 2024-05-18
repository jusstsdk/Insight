const jwt = require("jsonwebtoken");
const Trainee = require("../models/traineeModel");
const Instructor = require("../models/instructorModel");
const CorporateTrainee = require("../models/corporateTraineeModel");
require("dotenv").config();

module.exports = async function   (req, res, next) {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) return next();
  if (token === 'Bearer') {
    return next()
  }
  if (token === 'Bearer null') {
    return next()
  }

  token = token.substring(7);

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    let user = null
    user = await Trainee.findById(decoded._id);

    if (!user) {
      user = await Instructor.findById(decoded._id);

      if (!user) {
        user = await CorporateTrainee.findById(decoded._id);
      }
    }
    console.log(user?.isBanned)

    next();
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};
