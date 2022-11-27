const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
	rating: Number,
	review: String,
	trainee: Schema.ObjectId, //Reference trainee.
});

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
});

const videoSchema = new Schema({
	url: String,
	watched: Boolean,
});

const subtitleSchema = new Schema({
	hours: Number,
	videos: [videoSchema],
	exercises: [exerciseSchema],
});

const reportSchema = new Schema({
	title: String,
	type: {
		type: String,
		required: true,
		enum: ["Technical", "Financial", "Other"],
	},
	resolved: { type: Boolean, default: false },
	seen: { type: Boolean, default: false },
	description: String,
	author: {
		type: Schema.Types.ObjectId,
		required: true,
		// Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
		// will look at the `onModel` property to find the right model.
		refPath: "reports.traineeType",
	},
	traineeType: {
		type: String,
		required: true,
		enum: ["Trainee", "CorprateTrainee"],
	},
});

const courseSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		subjects: {
			type: [String],
			required: true,
		},
		summary: {
			type: String,
			required: true,
		},
		originalPrice: {
			type: Number,
			required: true,
		},
		price: Number,
		discount: {
			type: Number,
			required: false,
		},
		totalHours: {
			type: Number,
			required: true,
		},
		previewVid: {
			type: String,
			required: true,
		},
		instructors: {
			type: [{ type: Schema.ObjectId, ref: "Instructor" }],
			required: true,
		},
		subtitles: [subtitleSchema],
		exam: exerciseSchema,
		rating: Number,
		reviews: {
			type: [ratingSchema],
			required: false,
		},
		reports: {
			type: [reportSchema],
			required: false,
		},
		popularity: Number,
	},
	{ timestamps: true }
);

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

courseSchema.pre("save", function (next) {
	this.price =
		this.originalPrice - (this.originalPrice * this.discount) / 100;
	this.popularity = this.reviews.length;
	this.subtitles.forEach(subtitle => {
		this.totalHours += subtitle.hours;
	});
	next();
});

module.exports = mongoose.model("Course", courseSchema);