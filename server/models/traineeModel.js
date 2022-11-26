const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
	question: String,
	grade: Number,
});

const exerciseSchema = new Schema({
	exerciseQuestions: [questionSchema],
	maxGrade: Number, // could be a calculated attribute from total number of questions
	recievedGrade: Number, // could be a calculated attribute from sum of grades
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
		courses: [
			{
				courseId: { type: Schema.ObjectId, ref: "Course" },
				exercises: [exerciseSchema],
				progress: Number,
				requestedRefund: Boolean,
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Trainee", traineeSchema);
