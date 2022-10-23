const Instructor = require("../models/instructorModel");
const Course = require("../models/courseModel");
const mongoose = require("mongoose");

// get all instructors
const getInstructors = async (req, res) => {
	const instructors = await Instructor.find({}).sort({ createdAt: -1 });

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
		const instructor = await Instructor.create({
			username,
			password,
			email,
			minibiography,
			country,
			courses,
			ratings,
		});
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

// Create a new course
const createCourse = async (req, res) => {
	const { id } = req.params;
	const {
		title,
		subject,
		summary,
		price,
		discount,
		totalHours,
		previewVid,
		instructors,
		subtitle,
		vids,
		ratings,
		exercises,
		reports,
	} = req.body;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such instructor" });
	}
	// add to the database
	try {
		const course = await Course.create({
			title,
			subject,
			summary,
			price,
			discount,
			totalHours,
			previewVid,
			instructors,
			subtitle,
			vids,
			ratings,
			exercises,
			reports,
		});
		const instructor = await Instructor.findByIdAndUpdate(
			id,
			{ $push: { courses: course._id } },
			function (error, success) {
				if (error) {
					console.log(error);
				} else {
					console.log(success);
				}
			}
		);

		res.status(200).json(instructor);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// View all Courses' Titles given by him/her.
const viewTitles = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such instructor" });
	}
	// add to the database
	try {
		const instructor = await Instructor.findById(id).populate("courses");
		let titles = instructor.courses.map((course) => course.title);
		res.status(200).json({ titles: titles });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Filter the courses given by him/her based on a subject or price
const filterCourses = async (req, res) => {
	const { id } = req.params;
	const { subject, price } = req.query;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such instructor" });
	}
	// add to the database
	try {
		const instructor = await Instructor.findById(id).populate({
			path: "courses",
			// filtering field, you can use mongoDB syntax
			match: { $or: [{ subject: { $eq: subject } }, { price: { $eq: price } }] },
		});
		let titles = instructor.courses.map((course) => course.title);
		res.status(200).json({ titles: titles });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Search for a course given by him/her based on course title or subject or instructor
const searchCourses = async (req, res) => {
	const { id } = req.params;
	const { title, subject, instructor } = req.query;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such instructor" });
	}
	// add to the database
	try {
		const instructor = await Instructor.findById(id).populate({
			path: "courses",
			model: "Course",
			populate: [
				{
					path: "instructors",
					model: "Instructor",
					match: { username: { $eq: "Sn" } },
				},
			],

			// filtering field, you can use mongoDB syntax
			match: {
				$and: [
					{ title: { $regex: title, $options: "i" } },
					{ subject: { $regex: subject, $options: "i" } },
				],
			},
		});
		res.status(200).json({ instructor });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getInstructors,
	getInstructor,
	createInstructor,
	deleteInstructor,
	updateInstructor,
	createCourse,
	viewTitles,
	filterCourses,
	searchCourses,
};
