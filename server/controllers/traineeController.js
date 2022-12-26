const mongoose = require("mongoose");
const Trainee = require("../models/traineeModel");
const Course = require("../models/courseModel");
const bcrypt = require("bcrypt");

// create a new trainee
const createTrainee = async (req, res) => {
	// add to the database
	try {
		let traineeInfo = req.body;
		traineeInfo.password = await bcrypt.hash(traineeInfo.password, 10);
		const trainee = await Trainee.create(traineeInfo);
		trainee["_doc"]["x-auth-token"] = trainee.generateAuthToken();
		trainee["_doc"].userType = "Trainee";
		res.status(200).json(trainee);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getTrainees = async (req, res) => {
	const trainees = await Trainee.find();

	res.status(200).json(trainees);
};

//get a trainee by id
const getTrainee = async (req, res) => {
	const traineeId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(traineeId)) {
		return res.status(404).json({ error: "No such trainee" });
	}

	const trainee = await Trainee.findById(traineeId);

	if (!trainee) {
		return res.status(404).json({ error: "No such trainee" });
	}
	res.status(200).json(trainee);
};

//update a trainee's data
const updateTrainee = async (req, res) => {
	// add to the database
	const traineeId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(traineeId)) {
		return res.status(400).json({ error: "No such trainee" });
	}

	const trainee = await Trainee.findOneAndUpdate({ _id: traineeId }, req.body, {
		new: true,
	});

	if (!trainee) {
		return res.status(400).json({ error: "No such trainee" });
	}

	res.status(200).json(trainee);
};

//delete a trainee
const deleteTrainee = async (req, res) => {
	// add to the database
	const traineeId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(traineeId)) {
		return res.status(400).json({ error: "No such trainee" });
	}

	const trainee = await Trainee.findOneAndDelete({ _id: traineeId });

	if (!trainee) {
		return res.status(400).json({ error: "No such trainee" });
	}

	res.status(200).json(trainee);
};

const payCourse = async (req, res) => {
	// input: id of course and id of trainee and card info
	const traineeId = req.params.tId;
	const courseId = req.params.cId;

	//
	// the function should find course by id and get price, discount and exercises.
	if (!mongoose.Types.ObjectId.isValid(courseId)) {
		return res.status(404).json({ error: "No such course" });
	}

	const course = await Course.findById(courseId);

	if (!mongoose.Types.ObjectId.isValid(traineeId)) {
		return res.status(404).json({ error: "No such trainee" });
	}

	const trainee = await Trainee.findById(traineeId);

	let amountPaidByCard = course.price;
	amountPaidByCard -= trainee.wallet; //deduct the wallet credit from the price
	if (amountPaidByCard > 0) {
		trainee.wallet = 0; //wallet has less so it goes to zero
		//stripe payment using the amountPaidByCard and card that comes from req.body
	} else {
		trainee.wallet -= course.price;
		amountPaidByCard = 0; //wallet has either enough or more than needed
	}

	let newCourse = {
		course: courseId,
		subtitles: course.subtitles,
		exam: course.exam,
		paidPrice: course.price,
	};

	// add to the database
	trainee.courses.push(newCourse);
	await trainee.save();
	res.status(200).json(trainee);
};

const addPaymentMethod = async (req, res) => {
	const traineeId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(traineeId)) {
		return res.status(404).json({ error: "No such trainee" });
	}

	const trainee = await Trainee.findById(traineeId);
	trainee.paymentMethods.push(req.body);
	await trainee.save();
	res.status(200).json(trainee);
};

//delete a card
const deletePaymentMethod = async (req, res) => {
	const traineeId = req.params.tid;
	const paymentId = req.params.pid;

	if (!mongoose.Types.ObjectId.isValid(traineeId)) {
		return res.status(404).json({ error: "No such trainee" });
	}

	const trainee = await Trainee.findById(traineeId);

	trainee.paymentMethods = trainee.paymentMethods.filter((card) => card._id != paymentId);

	await trainee.save();
	res.status(200).json(trainee);
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

	const trainee = await Trainee.findById(traineeId);
	let paidPrice = 0;
	const foundCourse = trainee.courses.some((course, i) => {
		if (course.course._id.toString() == courseId) {
			trainee.courses[i].requestedRefund = true;
			paidPrice = trainee.courses[i].paidPrice;
			trainee.save();
			return true;
		}
	});
	if (foundCourse) {
		await Course.findByIdAndUpdate(courseId, {
			$push: {
				refundRequests: { trainee: traineeId, paidPrice: paidPrice },
			},
		});
		res.status(200).json("Requested refund successfully.");
	} else {
		res.status(400).json("Error: Requested refund Failed! Couldn't find Course.");
	}
};

// update isWatched to true in trainee.courses.subtitles.videos
const watchVideo = async (req, res) => {
	const traineeId = req.params.id;
	const courseIndex = req.body.courseIndex;
	const subtitleIndex = req.body.subtitleIndex;
	const videoIndex = req.body.videoIndex;
	let trainee = await Trainee.findById(traineeId);
	trainee.courses[courseIndex].subtitles[subtitleIndex].videos[videoIndex].isWatched = true;
	await trainee.save();
	res.status(200).json(trainee);
};

// Adds Note to a Video's Notes
const addNoteToVideoNotes = async (req, res) => {
	const traineeId = req.params.id;
	const courseIndex = req.body.courseIndex;
	const subtitleIndex = req.body.subtitleIndex;
	const videoIndex = req.body.videoIndex;
	const note = req.body.note;
	let trainee = await Trainee.findById(traineeId);
	trainee.courses[courseIndex].subtitles[subtitleIndex].videos[videoIndex].notes = [
		...trainee.courses[courseIndex].subtitles[subtitleIndex].videos[videoIndex].notes,
		note,
	];
	trainee.save();
	res.status(200).json(trainee);
};

// Deletes a Note from a Video's Notes
const deleteNoteFromVideoNotes = async (req, res) => {
	const traineeId = req.params.id;
	const courseIndex = req.body.courseIndex;
	const subtitleIndex = req.body.subtitleIndex;
	const videoIndex = req.body.videoIndex;
	const noteIndex = req.body.noteIndex;
	let trainee = await Trainee.findById(traineeId);
	let newNotes = trainee.courses[courseIndex].subtitles[subtitleIndex].videos[
		videoIndex
	].notes.filter((_, i) => i !== noteIndex);
	trainee.courses[courseIndex].subtitles[subtitleIndex].videos[videoIndex].notes = newNotes;
	trainee.save();
	res.status(200).json(trainee);
};

const solveExercise = async (req, res) => {
	const traineeId = req.params.id;
	const courseIndex = req.body.courseIndex;
	const subtitleIndex = req.body.subtitleIndex;
	const exerciseIndex = req.body.exerciseIndex;
	const questions = req.body.questions;
	let trainee = await Trainee.findById(traineeId);
	trainee.courses[courseIndex].subtitles[subtitleIndex].exercises[exerciseIndex].isSolved = true;
	trainee.courses[courseIndex].subtitles[subtitleIndex].exercises[exerciseIndex].questions =
		questions;
	await trainee.save();
	res.status(200).json(trainee);
};

const solveExam = async (req, res) => {
	const traineeId = req.params.id;
	const courseIndex = req.body.courseIndex;
	const questions = req.body.questions;
	let trainee = await Trainee.findById(traineeId);
	trainee.courses[courseIndex].exam.isSolved = true;
	trainee.courses[courseIndex].exam.questions = questions;
	await trainee.save();
	res.status(200).json(trainee);
};
module.exports = {
	createTrainee,
	requestRefund,
	getTrainees,
	getTrainee,
	updateTrainee,
	deleteTrainee,
	payCourse,
	addPaymentMethod,
	deletePaymentMethod,
	watchVideo,
	addNoteToVideoNotes,
	deleteNoteFromVideoNotes,
	solveExercise,
	solveExam,
};
