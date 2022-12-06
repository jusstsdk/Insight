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

// get a single instructor
const getInstructorReviews = async (req, res) => {
	const instructorId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(instructorId)) {
		return res.status(404).json({ error: "No such instructor" });
	}

	const instructor = await Instructor.findById(instructorId).populate("reviews.trainee");
	console.log(instructor);
	if (!instructor) {
		return res.status(404).json({ error: "No such instructor" });
	}

	res.status(200).json(instructor);
};

// create a new instructor
const createInstructor = async (req, res) => {
	// add to the database
	try {
		let instructorInfo = req.body;
		instructorInfo.password = await bcrypt.hash(instructorInfo.password, 10);
		let instructor = await Instructor.create(instructorInfo);
		instructor["_doc"]["x-auth-token"] = instructor.generateAuthToken();
		instructor["_doc"].userType = "instructor";
		res.status(200).json(instructor);
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

	const instructor = await Instructor.findOneAndUpdate({ _id: instructorId }, req.body, {
		new: true,
	});

	if (!instructor) {
		return res.status(400).json({ error: "No such instructor" });
	}

	res.status(200).json(instructor);
};

const reviewInstructor = async (req, res) => {
	let instructorId = req.params.id;

	const instructor = await Instructor.findById(instructorId).then((instructor) => {
		if (!instructor) {
			return res.status(400).json({ error: "No such Instructor" });
		}
		const found = instructor.reviews.some((review, i) => {
			if (review.trainee.toString() === req.body.trainee) {
				instructor.reviews[i].rating = req.body.rating;
				instructor.reviews[i].review = req.body.review;
			}
			return review.trainee.toString() === req.body.trainee;
		});
		if (!found) instructor.reviews.push(req.body);
		instructor.save();
		return instructor;
	});

	if (!instructor) {
		return res.status(400).json({ error: "No such Instructor" });
	}

	res.status(200).json(instructor);
};

module.exports = {
	getInstructors,
	getInstructor,
	createInstructor,
	deleteInstructor,
	updateInstructor,
	reviewInstructor,
	getInstructorReviews,
};
