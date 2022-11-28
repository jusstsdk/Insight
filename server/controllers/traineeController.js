const Trainee = require("../models/traineeModel");
const mongoose = require("mongoose");
const Course = require("../models/courseModel");

// create a new trainee
const createTrainee = async (req, res) => {
	// add to the database
	try {
		const trainee = await Trainee.create(req.body);
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
	console.log(trainee.courses.length);
	res.status(200).json(trainee);
};

//update a trainee's data
const updateTrainee = async (req, res) => {
	// add to the database
	const traineeId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(traineeId)) {
		return res.status(400).json({ error: "No such trainee" });
	}

	const trainee = await Trainee.findOneAndUpdate(
		{ _id: traineeId },
		req.body,
		{
			new: true,
		}
	);

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
	// input: id of course and id of trainee and selected payment method.
	const traineeId = req.params.tId;
	const courseId = req.params.cId;
	const cvv = req.body.cvv;
	const cardIndex = req.body.cardIndex;
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
		// console.log("amount paid from wallet = " + trainee.wallet + "\n new balance = 0");
		// console.log("amount paid from card = " + amountPaidByCard);
		trainee.wallet = 0; //wallet has less so it goes to zero
	} else {
		// console.log("amount paid from wallet = " + course.price);
		trainee.wallet -= course.price; //wallet has either enough or more than needed
		// console.log("new balance = " + trainee.wallet);
		// console.log("amount paid by card = 0");
	}

	let newCourse = {
		course: courseId,
		subtitles: course.subtitles,
		progress: 0,
		exam: course.exam,
		requestedRefund: false,
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
	const traineeId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(traineeId)) {
		return res.status(404).json({ error: "No such trainee" });
	}

	const trainee = await Trainee.findById(traineeId);
	trainee.paymentMethods.splice(req.body.cardIndex - 1, 1); //subtract one as we'll take its number in the list in the FE which starts at 1 but index starts from 0
	await trainee.save();
	res.status(200).json(trainee);
};

// Subscribe a student to a course
// const subscribeTraineeToCourse = async (traineeId, courseId) => {
// 	const course = await Course.findById(courseId);
// 	const trainee = await Trainee.findByIdAndUpdate(
// 		traineeId,
// 		{
// 			$push: {
// 				courses: {
// 					course: courseId,
// 					subtitles: course.subtitles,
// 					exam: course.exam,
// 				},
// 			},
// 		},
// 		{ new: true }
// 	);
// 	return trainee;
// };

module.exports = {
	createTrainee,
	getTrainees,
	getTrainee,
	updateTrainee,
	deleteTrainee,
	payCourse,
	addPaymentMethod,
	deletePaymentMethod,
};
