const Instructor = require("../models/instructorModel");
const Course = require("../models/courseModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// get all instructors
const getInstructors = async (req, res) => {
	const instructors = await Instructor.find();

	res.status(200).json(instructors);
};

// get a single instructor
const getInstructor = async (req, res) => {
	const instructorId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(instructorId)) {
		return res.status(404).json({ error: "No such instructor" });
	}

	const instructor = await Instructor.findById(instructorId);

	if (!instructor) {
		return res.status(404).json({ error: "No such instructor" });
	}

	res.status(200).json(instructor);
};

// get a single instructor's reviews populated with Trainee
const getInstructorReviews = async (req, res) => {
	const instructorId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(instructorId)) {
		return res.status(404).json({ error: "No such instructor" });
	}

	const instructor = await Instructor.findById(instructorId).populate(
		"reviews.trainee"
	);
	if (!instructor) {
		return res.status(404).json({ error: "No such instructor" });
	}
	instructor.reviews = instructor.reviews.filter(
		(review) => review.trainee !== null
	);
	instructor.save();
	res.status(200).json(instructor);
};

// create a new instructor
const createInstructor = async (req, res) => {
	// add to the database
	try {
		let instructorInfo = req.body;
		instructorInfo.password = await bcrypt.hash(instructorInfo.password, 10);
		let instructor = await Instructor.create(instructorInfo);
		let token = instructor.generateAuthToken();
		res.status(200).json({
			"x-auth-token": token,
			userType: "Instructor",
			user: instructor._doc,
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete a instructor
const deleteInstructor = async (req, res) => {
	const instructorId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(instructorId)) {
		return res.status(400).json({ error: "No such instructor" });
	}

	const instructor = await Instructor.findOneAndDelete({ _id: instructorId });

	if (!instructor) {
		return res.status(400).json({ error: "No such instructor" });
	}

	res.status(200).json(instructor);
};

// update a instructor
const updateInstructor = async (req, res) => {
	const instructorId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(instructorId)) {
		return res.status(400).json({ error: "No such instructor" });
	}

	const instructor = await Instructor.findOneAndUpdate(
		{ _id: instructorId },
		req.body,
		{
			new: true,
		}
	);

	if (!instructor) {
		return res.status(400).json({ error: "No such instructor" });
	}

	let token = instructor.generateAuthToken();
	res.status(200).json({
		"x-auth-token": token,
		userType: "Instructor",
		user: instructor._doc,
	});
};

const reviewInstructor = async (req, res) => {
	let instructorId = req.params.id;
	let instructor = await Instructor.findById(instructorId).then(
		async (instructor) => {
			if (!instructor) {
				return res.status(400).json({ error: "No such Instructor" });
			}
			instructor.reviews.some((review, i) => {
				if (review.trainee.toString() === req.body.trainee) {
					instructor.reviews.splice(i, 1);
				}
			});
			instructor.reviews.push(req.body);
			await instructor.save();
			return instructor;
		}
	);

	if (!instructor) {
		return res.status(400).json({ error: "No such Instructor" });
	}

	res.status(200).json(instructor);
};

const getMonthlyIncome = async (req, res) => {
	let instructorId = req.params.id;
	const instructor = await Instructor.findById(instructorId);
	if (!instructor) {
		return res.status(400).json({ error: "No such Instructor" });
	}
	if (instructor.monthlyPay.updatedAt.getMonth() < new Date().getMonth()) {
		instructor.monthlyPay.amount = 0;
	}

	instructor.save();
	res.status(200).json(instructor.monthlyPay.amount);
};

module.exports = {
	getInstructors,
	getInstructor,
	createInstructor,
	deleteInstructor,
	updateInstructor,
	reviewInstructor,
	getInstructorReviews,
	getMonthlyIncome,
};
