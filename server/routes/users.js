const express = require("express");
const Administrator = require("../models/administratorModel");
const CorporateTrainee = require("../models/corperateTraineeModel");
const Instructor = require("../models/instructorModel");
const Trainee = require("../models/traineeModel");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/login", async (req, res) => {
	//find an existing admin
	let user = await Administrator.findOne({
		username: req.body.username,
		password: req.body.password,
	});
	if (user) {
		const token = user.generateAuthToken();
		res.status(200).json({
			"x-auth-token": token,
			_id: user._id,
			username: user.username,
			userType: "admin",
		});
		return;
	}
	// find instructor
	user = await Instructor.findOne({
		username: req.body.username,
		password: req.body.password,
	});
	if (user) {
		const token = user.generateAuthToken();
		res.status(200).json({
			"x-auth-token": token,
			_id: user._id,
			username: user.username,
			userType: "instructor",
		});
		return;
	}
	// find Trainee
	user = await Trainee.findOne({
		username: req.body.username,
		password: req.body.password,
	});
	if (user) {
		const token = user.generateAuthToken();
		res.status(200).json({
			"x-auth-token": token,
			_id: user._id,
			username: user.username,
			userType: "trainee",
		});
    return;
	}
	// find CorporateTrainee
	user = await CorporateTrainee.findOne({
		username: req.body.username,
		password: req.body.password,
	});
	if (user) {
		const token = user.generateAuthToken();
		res.status(200).json({
			"x-auth-token": token,
			_id: user._id,
			username: user.username,
			userType: "corporateTrainee",
		});
		return;
	}
	// no user
	res.sendStatus(404);
});

// router.post("/signup", getAdministrator);

module.exports = router;