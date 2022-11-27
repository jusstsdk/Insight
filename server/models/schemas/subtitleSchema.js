const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
	question: String,
	studentAnswer: String,
	correctAnswer: String,
	choices: [String],
	grade: Boolean,
});

const exerciseSchema = new Schema({
	title: String,
	questions: [questionSchema],
	maxGrade: Number, // could be a calculated attribute from total number of questions
	recievedGrade: Number, // could be a calculated attribute from sum of grades
	isSolved: Boolean,
});

const videoSchema = new Schema({
	url: String,
	isWatched: Boolean,
});

const subtitleSchema = new Schema({
	hours: Number,
	videos: [videoSchema],
	exercises: [exerciseSchema],
});

questionSchema.pre("save", function (next) {
	this.grade = correctAnswer == studentAnswer;
	next();
});

exerciseSchema.pre("save", function (next) {
	this.recievedGrade = 0;
	this.questions.forEach((question) => {
		if (question.grade) {
			this.recievedGrade++;
		}
	});
	next();
});

module.exports.subtitleSchema = subtitleSchema;
module.exports.exerciseSchema = exerciseSchema;