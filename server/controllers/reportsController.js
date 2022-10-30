const Course = require("../models/courseModel");
const mongoose = require("mongoose");

// Report a Course
const reportCourse = async (req, res) => {
	try {
		const course = await Course.findByIdAndUpdate(
			req.params.id,
			{
				$push: { reports: req.body },
			},
			{ new: true }
		);
		res.status(200).json(course);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Filter the courses on a subject or price
const populateReports = async (req, res) => {
	// find results
	try {
		const course = await Course.findById(req.params.id).populate({
			path: "reports.author",
		});
		res.status(200).json(course);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Filter the courses on a subject or price
const getReports = async (req, res) => {
	// find results
	try {
		const course = await Course.find({ reports: { $exists: true, $ne: [] } }).populate({
			path: "reports.author",
		});
		res.status(200).json(course);
	} catch (error) {
		res.status(400).json({ error: "error.message " });
	}
};

module.exports = {
	reportCourse,
	populateReports,
	getReports,
};
