const express = require("express");
const Administrator = require("../models/administratorModel");
const CorporateTrainee = require("../models/corporateTraineeModel");
const Instructor = require("../models/instructorModel");
const Trainee = require("../models/traineeModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  //find an existing admin
  let user = await Administrator.findOne({
    username: { $regex: req.body.username, $options: "i" },
  });
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = user.generateAuthToken();
      res.status(200).json({
        "x-auth-token": token,
        userType: "Administrator",
        user: user._doc,
      });
    } else {
      res.status(401).json("wrong password");
    }
    return;
  }
  // find instructor
  user = await Instructor.findOne({
    username: { $regex: req.body.username, $options: "i" },
  });
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = user.generateAuthToken();
      res.status(200).json({
        "x-auth-token": token,
        userType: "Instructor",
        user: user._doc,
      });
    } else {
      res.status(401).json("wrong password");
    }
    return;
  }
  // find Trainee
  user = await Trainee.findOne({
    username: { $regex: req.body.username, $options: "i" },
  });
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = user.generateAuthToken();
      res.status(200).json({
        "x-auth-token": token,
        userType: "Trainee",
        user: user._doc,
      });
    } else {
      res.status(401).json("wrong password");
    }
    return;
  }
  // find CorporateTrainee
  user = await CorporateTrainee.findOne({
    username: { $regex: req.body.username, $options: "i" },
  });
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = user.generateAuthToken();
      res.status(200).json({
        "x-auth-token": token,
        userType: "CorporateTrainee",
        user: user._doc,
      });
    } else {
      res.status(401).json("wrong password");
    }
    return;
  }
  // no user
  res.sendStatus(404);
});

router.post("/forgotPassword", async (req, res) => {
  let user = await Administrator.findOne({
    username: req.body.username,
  });
  let type = 'Admin'

  if (!user) {
    user = await Instructor.findOne({
      username: req.body.username,
    });

    type = 'Instructor'
  }

  if (!user) {
    user = await Trainee.findOne({
      username: req.body.username,
    });

    type = 'Trainee'
  }

  if (!user) {
    res.sendStatus(404);
    return;
  }

  let mailTransporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const token = user.generateAuthToken();

  const generateNewPassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0, n = charset.length; i < 9; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
  }

  const newPassword = generateNewPassword()

  let mailDetails = {
    to: `${user.email}`,
    subject: "Восстановление пароля",
    text: `Ваш новый пароль ${newPassword}`,
  };

  const bcryptPassword = await bcrypt.hash(
      newPassword,
      10
  )

  if (type === 'Admin') {
    await Administrator.findOneAndUpdate(
        { _id: user._id },
        { password: bcryptPassword },
        { new: true })
  } else if (type === 'Instructor') {
    await Instructor.findOneAndUpdate(
        { _id: user._id },
        { password: bcryptPassword },
        { new: true })
  } else if (type === 'Trainee') {
    await Trainee.findOneAndUpdate(
        { _id: user._id },
        { password: bcryptPassword },
        { new: true })
  }

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.post("/resetPassword", async (req, res) => {
  //get the token from the header if present
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  //if no token found, return response (without going to the next middleware)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  token = token.substring(7);

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    return res.status(400).json({ error: "Invalid token" });
  }

  let user;

  let userForCheckPassword;

  switch (decoded.userType) {
    case "Administrator":
      userForCheckPassword = await Administrator.findById(decoded._id);
      break;
    case "Instructor":
      userForCheckPassword = await Instructor.findById(decoded._id);
      break;
    case "Trainee":
      userForCheckPassword = await Trainee.findById(decoded._id);
      break;
  }


  if (!(await bcrypt.compare(req.body.oldPassword, userForCheckPassword.password))) {
    return res.status(400).json({ error: "Invalid password" });
  }

  const password = await bcrypt.hash(req.body.password, 10);

  switch (decoded.userType) {
    case "Administrator":
      user = await Administrator.findOneAndUpdate(
          { _id: decoded._id },
          { password: password },
          { new: true },
      );
      break;
    case "Instructor":
      user = await Instructor.findOneAndUpdate(
          { _id: decoded._id },
          { password: password },
          { new: true },
      );
      break;
    case "Trainee":
      user = await Trainee.findOneAndUpdate(
          { _id: decoded._id },
          { password: password },
          { new: true },
      );
      break;
  }

  if (!user) {
    return res.status(400).json({ error: "Invalid token" });
  }

  res.status(200).json(user);
});

router.put("/toggle-ban", async (req, res) => {
  const { isBanned, userType, userId } = req.body;

  console.log(req.body);

  if (userType === "Trainee") {
    try {
      const user = await Trainee.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }
      user.isBanned = isBanned;
      await user.save();
      res.json({ message: "Успех" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Что-то пошло не так" });
    }
  } else if (userType === "Instructor") {
    try {
      const user = await Instructor.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }
      user.isBanned = isBanned;
      await user.save();
      res.json({ message: "Успех" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Что-то пошло не так" });
    }
  }
});

router.put("/check-banned", async (req, res) => {
  const { id } = req.body;

  try {
    let user = null
    user = await Trainee.findById(id);

    if (!user) {
      user = await Instructor.findById(id);

      if (!user) {
        user = await CorporateTrainee.findById(id);
      }
    }

    console.log(user)

    // user.isBanned = isBanned;
    // await user.save();
    res.json({ message: "Успех" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Что-то пошло не так" });
  }
});

module.exports = router;
