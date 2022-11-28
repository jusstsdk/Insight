const Administrator = require("../models/administratorModel");
const mongoose = require("mongoose");
const CorporateTrainee = require("../models/corperateTraineeModel");

// get all administrators
const getAdministrators = async (req, res) => {
	const administrators = await Administrator.find();
	res.status(200).json(administrators);
};

//GET all access requests of a all courses
const getAllCoursesRequests = async (req, res) => {
	try {
		const corporateTrainee = await CorporateTrainee.find({
			requests: { $exists: true, $ne: [] },
		}).populate({
			path: "requests",
		});
		console.log(corporateTrainee);
		res.status(200).json({ CorporateTrainee: corporateTrainee });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//UPDATE grant access to a specific course
const handleCourseRequest = async (req, res) => {
	const corporateTrainee = await CorporateTrainee.updateOne(
		{ "requests._id": req.body.requestId },
		{ "requests.$.status": req.body.status }
	);
	//Body --> course Id, status, corp Trainee Id

	if (!corporateTrainee) {
		return res.status(400).json({ error: "No such corporate Trainee" });
	}

	res.status(200).json(corporateTrainee);
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

	const administrator = await Administrator.findOneAndUpdate(
		{ _id: administratorId },
		req.body,
		{ new: true }
	);

	if (!administrator) {
		return res.status(400).json({ error: "No such administrator" });
	}

	res.status(200).json(administrator);
};

module.exports = {
	getAdministrators,
	getAdministrator,
	createAdministrator,
	deleteAdministrator,
	updateAdministrator,
	getAllCoursesRequests,
	handleCourseRequest,
};
