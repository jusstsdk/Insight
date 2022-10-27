const CorporateTrainee = require("../models/corperateTraineeModel");
const mongoose = require("mongoose");

// get all CorporateTrainees
const getCorporateTrainees = async (req, res) => {
	const corporateTrainees = await CorporateTrainee.find({});

	res.status(200).json(corporateTrainees);
};

// get a single corporateTrainee
const getCorporateTrainee = async (req, res) => {
	const traineeId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(traineeId)) {
		return res.status(404).json({ error: "No such corporate trainee" });
	}

	const corporateTrainee = await CorporateTrainee.findById(traineeId);

	if (!corporateTrainee) {
		return res.status(404).json({ error: "No such corporate trainee" });
	}

	res.status(200).json(corporateTrainee);
};

// create a new corporate trainee
const createCorporateTrainee = async (req, res) => {
	// add to the database
	try {
		const corporateTrainee = await CorporateTrainee.create(req.body);
		res.status(200).json(corporateTrainee);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// delete a corporate trainee
const deleteCorporateTrainee = async (req, res) => {
	const traineeId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(traineeId)) {
		return res.status(400).json({ error: "No such corporate trainee" });
	}

	const corporateTrainee = await CorporateTrainee.findOneAndDelete({
		_id: traineeId,
	});

	if (!corporateTrainee) {
		return res.status(400).json({ error: "No such corporate trainee" });
	}

	res.status(200).json(corporateTrainee);
};

// update a corporate trainee
const updateCorporateTrainee = async (req, res) => {
	const traineeId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(traineeId)) {
		return res.status(400).json({ error: "No such corporate trainee" });
	}

	const corporateTrainee = await CorporateTrainee.findOneAndUpdate({ _id: traineeId }, req.body, {
		new: true,
	});

	if (!corporateTrainee) {
		return res.status(400).json({ error: "No such corporate trainee" });
	}

	res.status(200).json(corporateTrainee);
};

module.exports = {
	getCorporateTrainees,
	getCorporateTrainee,
	createCorporateTrainee,
	deleteCorporateTrainee,
	updateCorporateTrainee,
};
