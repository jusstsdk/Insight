const Instructor = require("../models/instructorModel");
const Course = require("../models/courseModel");
const mongoose = require("mongoose");

// get all instructors
const getInstructors = async (req, res) => {
	const instructors = await Instructor.find().sort({ createdAt: -1 });

	res.status(200).json(instructors);
};

// get a single instructor
const getInstructor = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such instructor" });
	}

	const instructor = await Instructor.findById(id);

	if (!instructor) {
		return res.status(404).json({ error: "No such instructor" });
	}

	res.status(200).json(instructor);
};

// create a new instructor
const createInstructor = async (req, res) => {
	const { username, password, email, minibiography, country, courses, ratings } = req.body;
	console.log(req.body);

	// add to the database
	try {
		const instructor = await Instructor.create(req.body);
		res.status(200).json(instructor);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete a instructor
const deleteInstructor = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "No such instructor" });
	}

	const instructor = await Instructor.findOneAndDelete({ _id: id });

	if (!instructor) {
		return res.status(400).json({ error: "No such instructor" });
	}

	res.status(200).json(instructor);
};

// update a instructor
const updateInstructor = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "No such instructor" });
	}

	const instructor = await Instructor.findOneAndUpdate({ _id: id }, req.body, {
		new: true,
	});

	if (!instructor) {
		return res.status(400).json({ error: "No such instructor" });
	}

	res.status(200).json(instructor);
};

module.exports = {
	getInstructors,
	getInstructor,
	createInstructor,
	deleteInstructor,
	updateInstructor,
};
