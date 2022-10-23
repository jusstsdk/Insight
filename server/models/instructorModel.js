const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Course = require("../models/courseModel");

const ratingSchema = new Schema({
	rating: Number,
	review: String,
	trainee: { type: Schema.ObjectId, ref: "Course" },
});

const instructorSchema = new Schema(
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
		minibiography: {
			type: String,
			required: false,
		},
		country: {
			type: String,
			required: false,
		},
		courses: [{ type: Schema.ObjectId, ref: "Course" }],
		ratings: {
			type: [ratingSchema],
			required: false,
		},
	},
	{ timestamps: false }
);

const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;
