const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseModelSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		summary: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		discount: {
			type: Number,
			required: false,
		},
		totalHours: {
			type: Number,
			required: true,
		},
		previewVid: {
			type: Number,
			required: true,
		},
		instructors: {
			type: [Schema.ObjectId],
			required: true,
		},
		subtitle: {
			type: [String],
			required: true,
		},
		vids: {
			type: [String],
			required: false,
		},
		ratings: {
			type: [ratingSchema],
			required: false,
		},
		exercises: {
			type: [exerciseSchema],
			required: false,
		},
		reports: {
			type: [reportsSchema],
			required: false,
		},
	},
	{ timestamps: true }
);

const ratingSchema = new Schema({
	rating: Number,
	review: String,
	trainee: Schema.ObjectId, //Reference trainee.
});

const exerciseSchema = new Schema({
	number: Number,
	title: String,
	questions: String,
});

const reportsSchema = new Schema({
	resolved: Boolean,
	title: String,
	description: String,
	reporter: Schema.ObjectId, //Reference trainee/instructor.
});

module.exports = mongoose.model("Course", courseModelSchema);
