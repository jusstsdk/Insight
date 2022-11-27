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
	recievedGrade: Number, // could be a calculated attribute from sum of grades
	isSolved: {
        type: Boolean,
        default: false
    },
});

const videoSchema = new Schema({
	url: String,
	isWatched: {
        type: Boolean,
        default: false
    },
});

const subtitleSchema = new Schema({
	hours: Number,
	videos: [videoSchema],
	exercises: [exerciseSchema],
});

questionSchema.pre("save", function (next) {
	this.grade = this.correctAnswer == this.studentAnswer;
	next();
});

exerciseSchema.pre("save", function (next) {
	this.recievedGrade = 0;
	this.maxGrade = this.questions.length;
	this.questions.forEach((question) => {
		if (question.grade) {
			this.recievedGrade++;
		}
	});
	next();
});

module.exports = {
	subtitleSchema,
	exerciseSchema
};