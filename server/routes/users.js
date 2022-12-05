const express = require("express");
const Administrator = require("../models/administratorModel");
const CorporateTrainee = require("../models/corporateTraineeModel");
const Instructor = require("../models/instructorModel");
const Trainee = require("../models/traineeModel");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/login", async (req, res) => {
	//find an existing admin
	let user = await Administrator.findOne({
		username: req.body.username
	});
	if (user) {
		if (await bcrypt.compare(req.body.password, user.password)) {
			const token = user.generateAuthToken();
			res.status(200).json({
				"x-auth-token": token,
				userType: "admin",
				user: user._doc
			});
		} else {
			res.status(403).json("wrong password");
		}
		return;
	}
	// find instructor
	user = await Instructor.findOne({
		username: req.body.username
	});
	if (user) {
		if (await bcrypt.compare(req.body.password, user.password)) {
			const token = user.generateAuthToken();
			res.status(200).json({
				"x-auth-token": token,
				userType: "instructor",
				user: user._doc
			});
		} else {
			res.status(403).json("wrong password");
		}
		return;
	}
	// find Trainee
	user = await Trainee.findOne({
		username: req.body.username
	});
	if (user) {
		if (await bcrypt.compare(req.body.password, user.password)) {
			const token = user.generateAuthToken();
			res.status(200).json({
				"x-auth-token": token,
				userType: "trainee",
				user: user._doc
			});
		} else {
			res.status(403).json("wrong password");
		}
		return;
	}
	// find CorporateTrainee
	user = await CorporateTrainee.findOne({
		username: req.body.username
	});
	if (user) {
		if (await bcrypt.compare(req.body.password, user.password)) {
			const token = user.generateAuthToken();
			res.status(200).json({
				"x-auth-token": token,
				userType: "corporateTrainee",
				user: user._doc
			});
		} else {
			res.status(403).json("wrong password");
		}
		return;
	}
	// no user
	res.sendStatus(404);
});

module.exports = router;
