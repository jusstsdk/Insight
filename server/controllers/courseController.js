const Instructor = require("../models/instructorModel");
const Course = require("../models/courseModel");
const mongoose = require("mongoose");

// Create a new course
const createCourse = async (req, res) => {
	const { id } = req.params;
	let instructors = req.body.instructors;
	instructors.push(id);
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such instructor" });
	}
	// add to the database
	try {
		const course = await Course.create(req.body);
		console.log(req.body);
		const instructor = await Instructor.updateMany(
			{ _id: instructors },
			{ $push: { courses: course._id } }
		);
		res.status(200).json(course);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// View all Courses' Titles given by him/her.
const getCourses = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such instructor" });
	}
	// add to the database
	try {
		const instructor = await Instructor.findById(id).populate("courses");
		// let titles = instructor.courses.map((course) => course.title);
		res.status(200).json({ instructor });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Not working
// Filter the courses given by him/her based on a subject or price
const filterCourses = async (req, res) => {
	const { id } = req.params;
	const { subject, price } = req.query;
	console.log(req.query);
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such instructor" });
	}
	// add to the database
	try {
		const instructor = await Instructor.findById(id).populate({
			path: "courses",
			// filtering field, you can use mongoDB syntax
			match: { $and: [{ subjects: { $elemMatch: { $eq: subject } } }, { price: { $lte: price } }] },
		});
		res.status(200).json({ courses: instructor.courses });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Search for a course given by him/her based on course title or subject or instructor
const searchCourses = async (req, res) => {
	const { id } = req.params;
	const { title, subject, instructor } = req.query;
	console.log(req.query);
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such instructor" });
	}
	// add to the database
	try {
		const instructorById = await Instructor.findById(id).populate({
			path: "courses",
			model: "Course",
			populate: [
				{
					path: "instructors",
					model: "Instructor",
					match: { username: { $regex: instructor, $options: "i" } },
				},
			],

			// filtering field, you can use mongoDB syntax
			match: {
				$and: [
					{ title: { $regex: title, $options: "i" } },
					{ subject: { $regex: subject, $options: "i" } },
					{ instructors: { $ne: [] } },
				],
			},
		});
		res.status(200).json({ courses: instructorById.courses });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	createCourse,
	getCourses,
	filterCourses,
	searchCourses,
};
