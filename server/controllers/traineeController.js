const mongoose = require("mongoose");
const Trainee = require("../models/traineeModel");
const Course = require("../models/courseModel");

// create a new instructor
const createTrainee = async (req, res) => {
	// add to the database
	try {
		const trainee = await Trainee.create(req.body);
		res.status(200).json(trainee);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// create a new instructor
const payCourse = async (req, res) => {
	// input: id of course and id of trainee and selected payment method.
	// the function should find course by id and get price, discount and exercises.
	// it should also get trainee by id, use the selected payment method and deduct the (price - discount * price).
	// it then create a new object:
	// {
	// 	course: { type: Schema.ObjectId, ref: "Course" },
	// 	exercises: [exerciseSchema],
	// 	// exercises: [[questions]]
	// },
	// the course attribute should be the id of the course to be able to reference it later.
	// the exercises should be the array of exercises of the course.
	// when a trainee chooses to solve an exercise, there should be a route that handles getting the specific exrercise by exercise id.
	// after solving the exercise, each question should get a grade and the total grade of the exercise should be calculated from summing up the grades of the questions.
	// the calculated grade should be saved in the recievedGrade.

	// add to the database
	try {
		const trainee = await Trainee.create(req.body);
		res.status(200).json(trainee);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// request a refund for a specific course
const requestRefund = async (req, res) => {
	const traineeId = req.params.traineeId;
	const courseId = req.params.courseId;

	if (!mongoose.Types.ObjectId.isValid(traineeId)) {
		return res.status(400).json({ error: "No such Trainee" });
	}
	if (!mongoose.Types.ObjectId.isValid(courseId)) {
		return res.status(400).json({ error: "No such Course" });
	}

	const trainee = await Trainee.findById(traineeId)
		.populate("courses.courseId")
		.then(async (trainee) => {
			// if (!trainee) {
			// 	return res.status(400).json({ error: "No such Trainee" });
			// }
			let foundCourse = false;
			const requestedRefund = trainee.courses.some((course, i) => {
				if (course.courseId._id.toString() == courseId) {
					foundCourse = true;
					if (course.progress < 0.5) {
						trainee.courses[i].requestedRefund = true;
						return true;
					} else {
						return false;
					}
				}
			});
			if (foundCourse) {
				if (requestedRefund) {
					const updateCourse = await Course.findByIdAndUpdate(
						courseId,
						{
							$push: { refundRequests: traineeId },
						},
						{ new: true }
					);
					if (!updateCourse) {
						res.status(400).json("Error: Requested refund Failed!");
					} else {
						trainee.save();
					}
					res.status(200).json("Requested refund successfully.");
				} else {
					res
						.status(200)
						.json("Requested refund Failed. Already Completed more than 50% of the course");
				}
			} else {
				res.status(400).json("Error: Requested refund Failed! Couldn't find Course.");
			}

			return trainee;
		});

	if (!trainee) {
		return res.status(400).json({ error: "No such Trainee" });
	}
};

module.exports = {
	createTrainee,
	requestRefund,
};
