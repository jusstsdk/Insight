const mongoose = require("mongoose");
const Course = require("../models/courseModel");
const Trainee = require("../models/traineeModel");
const CorporateTrainee = require("../models/corperateTraineeModel");
const Instructor = require("../models/instructorModel");

// Report a Course
const reportCourse = async (req, res) => {
	const courseId = req.params.courseId;
	try {
		const course = await Course.findByIdAndUpdate(courseId, {
			$push: { reports: req.body },
		});

		res.status(200).json("Course Reported Successfully");
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Get all courses and populate author
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

// Get all User Reports
const getUserReports = async (req, res) => {
	const authorId = req.params.author;

	try {
		const courses = await Course.find({
			reports: { $elemMatch: { author: authorId } },
		});
		courses.forEach((course) => {
			course.reports = course.reports.filter((report) => report.author == authorId);
		});
		console.log(courses);

		res.status(200).json(courses);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	reportCourse,
	populateReports,
	getReports,
	updateReportStatus,
	getUserReports,
};
