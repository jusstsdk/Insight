const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseTraineeSchema = new Schema({
	courseID: {
		type: Schema.ObjectId, //references courseModel
		required: true,
	},
	exercisesSolved: [reportSchema],
});

const exerciseTraineeSchema = new Schema({
	exerciseID: Schema.ObjectId, //refrences exerciseModel
	grade: Number,
});

const traineeSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: false,
		},
		courses: {
			type: [courseTraineeSchema],
			required: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Administrator", administratorSchema);
