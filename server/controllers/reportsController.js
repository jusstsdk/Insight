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

// Get all courses and populate authord
const populateReports = async (req, res) => {
	try {
		const course = await Course.findById(req.params.id).populate({
			path: "reports.author",
		});
		res.status(200).json(course);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Get all courses with Reports and populate the author
const getReports = async (req, res) => {
	try {
		const course = await Course.find({ reports: { $exists: true, $ne: [] } }).populate({
			path: "reports.author",
		});
		res.status(200).json(course);
	} catch (error) {
		res.status(400).json({ error: "error.message " });
	}
};

// Update Report resolved and/or seen.
const updateReportStatus = async (req, res) => {
	try {
		let updateQuery = {};
		if (req.body.resolved != null) updateQuery["reports.$.resolved"] = req.body.resolved;
		if (req.body.seen != null) updateQuery["reports.$.seen"] = req.body.seen;

		const course = await Course.updateOne({ "reports._id": req.params.id }, { $set: updateQuery });
		res.status(200).json(course);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	reportCourse,
	populateReports,
	getReports,
	updateReportStatus,
};
