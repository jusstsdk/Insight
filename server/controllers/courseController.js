const Instructor = require("../models/instructorModel");
const Course = require("../models/courseModel");
const mongoose = require("mongoose");

// Get a single course
const getCourse = async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(404).json({ error: "No such Course (getCourse)" });
	}

	const course = await Course.findById(req.params.id);

	if (!course) {
		return res.status(404).json({ error: "No such Course (getCourse)" });
	}

	res.status(200).json(course);
};

// Create a new course
const createCourseInstructor = async (req, res) => {
	const instructorId = req.params.id;
	let instructors = req.body.instructors;
	instructors.push(instructorId);
	if (!mongoose.Types.ObjectId.isValid(instructorId)) {
		return res.status(404).json({ error: "No such instructor" });
	}
	// add to the database
	try {
		const course = await Course.create(req.body);

		// update instructors in db
		await Instructor.updateMany(
			{ _id: instructors },
			{ $push: { courses: course._id } }
		);
		res.status(200).json(course);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Filter the courses given by a specific instructor based on a subject or price
const getCoursesInstructor = async (req, res) => {
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

// Filter the courses on a subject or price
const getCourses = async (req, res) => {
	// create filter query from querystring
	let query = {};
	if (Object.keys(req.query).length > 0) query = { $and: [] };
	if (req.query.maxPrice != null) {
		query["$and"].push({
			price: {
				$lte: req.query.maxPrice,
			},
		});
	}
	if (req.query.minPrice != null) {
		query["$and"].push({
			price: {
				$gte: req.query.minPrice,
			},
		});
	}
	if (req.query.subject != null) {
		query["$and"].push({
			subjects: {
				$elemMatch: {
					$regex: req.query.subject,
					$options: "i",
				},
			},
		});
	}

	if (req.query.rating != null) {
		query["$and"].push({
			rating: {
				$gte: req.query.rating,
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

	// find results
	try {
		const course = await Course.find(query).populate("instructors");
		res.status(200).json(course);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Update a Course
const updateCourse = async (req, res) => {
	let course = await Course.findById(req.params.id);
	course = Object.assign(course, req.body);
	let updatedCourse = await course.save();

	if (!updatedCourse) {
		return res.status(400).json({ error: "No such course (updateCourse)" });
	}

	res.status(200).json(updatedCourse);
};

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

const populateReports = async (req, res) => {
	// find results
	try {
		const course = await Course.findById(req.params.id).populate(
			"reports.author"
		);
		res.status(200).json(course);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getReports = async (req, res) => {
	// find results
	try {
		const course = await Course.find({
			reports: { $exists: true, $ne: [] },
		}).populate({
			path: "reports.author",
		});
		res.status(200).json(course);
	} catch (error) {
		res.status(400).json({ error: "error.message " });
	}
};

const reviewCourse = async (req, res) => {
	let courseId = req.params.id;
	const course = await Course.findById(courseId).then((course) => {
		if (!course) {
			return res.status(400).json({ error: "No such course" });
		}
		const found = course.reviews.some((review, i) => {
			if (review.trainee.toString() === req.body.trainee) {
				course.reviews[i].rating = req.body.rating;
				course.reviews[i].review = req.body.review;
				return review.trainee.toString() === req.body.trainee;
			}
		});
		if (!found) course.reviews.push(req.body);
		course.save();
		return course;
	});
	if (!course) {
		return res.status(400).json({ error: "No such course" });
	}

	res.status(200).json(course);
};

// set promotion for all provided course ids
async function promotionCourses(req, res) {
	const courses = req.body.courses;

	courses.forEach(async (courseId) => {
		const course = await Course.findById(courseId);
		course.promotion = {
			startDate: req.body.startDate,
			endDate: req.body.endDate,
			discount: req.body.discount,
		};
		course.save();
	});

	res.sendStatus(200);
};

module.exports = {
	getCourse,
	getCourses,
	createCourseInstructor,
	getCoursesInstructor,
	updateCourse,
	reportCourse,
	populateReports,
	getReports,
	reviewCourse,
	promotionCourses,
};
