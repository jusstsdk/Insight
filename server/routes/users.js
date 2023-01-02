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

	if (!user) {
		user = await Instructor.findOne({
			username: req.body.username,
		});
	}

	if (!user) {
		user = await CorporateTrainee.findOne({
			username: req.body.username,
		});
	}

	if (!user) {
		user = await Trainee.findOne({
			username: req.body.username,
		});
	}

	if(!user)
	{
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

	let mailDetails = {
		to: `${user.email}`,
		subject: "Reset Password",
		text: `if you requested a password reset please click this line${process.env.CLIENT_URL}/guest/resetPassword?jwt=${token} but if you did not then contact the website admins to resolve this issue`,
	};

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
	if (!token)
		return res.status(401).send("Access denied. No token provided.");

	token = token.substring(7);
	
	let decoded;

	try {
		decoded = jwt.verify(token, process.env.SECRET);
	} catch (err) {
		return res.status(400).json({ error: "Invalid token" });
	}

	let user;

	password = await bcrypt.hash(req.body.password, 10);

	switch (decoded.userType) {
		case "Administrator":
			user = await Administrator.findOneAndUpdate(
				{ _id: decoded._id },
				{ password: password },
				{ new: true }
			);
			break;
		case "Instructor":
			user = await Instructor.findOneAndUpdate(
				{ _id: decoded._id },
				{ password: password },
				{ new: true }
			);
			break;
		case "Trainee":
			user = await Trainee.findOneAndUpdate(
				{ _id: decoded._id },
				{ password: password },
				{ new: true }
			);
			break;
		case "CorporateTrainee":
			user = await CorporateTrainee.findOneAndUpdate(
				{ _id: decoded._id },
				{ password: password },
				{ new: true }
			);
			break;
	}

	if (!user) {
		return res.status(400).json({ error: "Invalid token" });
	}

	res.status(200).json(user);
});

module.exports = router;
