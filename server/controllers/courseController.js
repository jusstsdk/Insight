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

// Not working
// Filter the courses given by him/her based on a subject or price
const getCourses = async (req, res) => {
	// check if valid Id
	let instructorId = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(instructorId)) {
		return res.status(404).json({ error: "No such instructor" });
	}

	// create filter query from querystring
	let query = {};
	if (Object.keys(req.query).length > 0) query = { $and: [] };
	if (req.query.price != null) {
		query["$and"].push({
			price: {
				$lte: req.query.price,
			},
		});
	}
	if (req.query.subject != null) {
		query["$and"].push({
			subjects: {
				$elemMatch: { $eq: req.query.subject },
			},
		});
	}

	// create filter query from querystring
	if (req.query.searchQuery != null) {
		query["$and"].push({
			$or: [
				{ title: { $regex: req.query.searchQuery, $options: "i" } },
				{
					subjects: {
						$elemMatch: {
							$regex: req.query.searchQuery,
							$options: "i",
						},
					},
				},
				{
					"instructors.username": {
						$regex: req.query.searchQuery,
						$options: "i",
					},
				},
			],
		});
	}

	console.log(JSON.stringify(query));
	// find results
	try {
		const instructor = await Instructor.findById(instructorId).populate({
			path: "courses",
			populate: {
				path: "instructors",
			},
			match: query,
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
					match: { username: { $regex: instructor, $options: "i" } },
				},
			],
			// search & filter & filter2
			// filtering field, you can use mongoDB syntax
			match: {
				$and: [
					{
						$or: [
							{ title: { $regex: title, $options: "i" } },
							{ subject: { $regex: subject, $options: "i" } },
						],
					},
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
	searchCourses,
};
