const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
	question: String,
	studentAnswer: String,
	correctAnswer: String,
	choices: [String],
	grade: {
        type: Boolean,
        default: false
    },
});

const exerciseSchema = new Schema({
	title: String,
	questions: [questionSchema],
	maxGrade: Number, // could be a calculated attribute from total number of questions
	receivedGrade: Number, // could be a calculated attribute from sum of grades
	isSolved: {
        type: Boolean,
        default: false
    },
});

const videoSchema = new Schema({
	title: String,
	url: String,
	description: String,
	isWatched: {
        type: Boolean,
        default: false
    },
});

const subtitleSchema = new Schema({
	title: String,
	hours: Number,
	videos: [videoSchema],
	exercises: [exerciseSchema],
});

questionSchema.pre("save", function (next) {
	this.grade = this.correctAnswer == this.studentAnswer;
	next();
});

exerciseSchema.pre("save", function (next) {
	this.receivedGrade = 0;
	this.maxGrade = this.questions.length;
	this.questions.forEach((question) => {
		if (question.grade) {
			this.receivedGrade++;
		}
	});
	next();
});

module.exports = {
	subtitleSchema,
	exerciseSchema
};