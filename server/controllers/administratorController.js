const mongoose = require("mongoose");
const Administrator = require("../models/administratorModel");
const Course = require("../models/courseModel");
const Trainee = require("../models/traineeModel");

// get all administrators
const getAdministrators = async (req, res) => {
	const administrators = await Administrator.find();
	res.status(200).json(administrators);
};

// get a single administrator
const getAdministrator = async (req, res) => {
	const administratorId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(administratorId)) {
		return res.status(404).json({ error: "No such administrator" });
	}

	const administrator = await Administrator.findById(administratorId);

	if (!administrator) {
		return res.status(404).json({ error: "No such administrator" });
	}

	res.status(200).json(administrator);
};

// create a new administrator
const createAdministrator = async (req, res) => {
	// add to the database
	try {
		const administrator = await Administrator.create(req.body);
		res.status(200).json(administrator);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete a administrator
const deleteAdministrator = async (req, res) => {
	const administratorId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(administratorId)) {
		return res.status(400).json({ error: "No such administrator" });
	}

	const administrator = await Administrator.findOneAndDelete({
		_id: administratorId,
	});

	if (!administrator) {
		return res.status(400).json({ error: "No such administrator" });
	}

	res.status(200).json(administrator);
};

// update a administrator
const updateAdministrator = async (req, res) => {
	const administratorId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(administratorId)) {
		return res.status(400).json({ error: "No such administrator" });
	}

	const administrator = await Administrator.findOneAndUpdate({ _id: administratorId }, req.body, {
		new: true,
	});

	if (!administrator) {
		return res.status(400).json({ error: "No such administrator" });
	}

	res.status(200).json(administrator);
};

// Get all courses with Refunds and populate the TraineeId
const getRefundRequests = async (req, res) => {
	try {
		const course = await Course.find({ refundRequests: { $exists: true, $ne: [] } }).populate({
			path: "refundRequests.traineeId",
		});
		res.status(200).json(course);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Refund to Trainee's Wallet
const refundToWallet = async (req, res) => {
	const traineeId = req.params.traineeId;
	const courseId = req.params.courseId;
	const refundedAmount = req.body.refundedAmount;
	try {
		const trainee = await Trainee.findByIdAndUpdate(traineeId, {
			$inc: { wallet: refundedAmount },
			$pull: { courses: { courseId: mongoose.Types.ObjectId(courseId) } },
		});
		const course = await Course.findByIdAndUpdate(
			courseId,
			{
				$pull: { refundRequests: { traineeId: mongoose.Types.ObjectId(traineeId) } },
			},
			{ new: true }
		);
		res.status(200).json(course);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getAdministrators,
	getAdministrator,
	createAdministrator,
	deleteAdministrator,
	updateAdministrator,
	getRefundRequests,
	refundToWallet,
};
