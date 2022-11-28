const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = require("./schemas/reviewSchema");

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
		biography: {
			type: String,
			required: false,
		},
		country: {
			type: String,
			required: false,
		},
		courses: [{ type: Schema.ObjectId, ref: "Course" }],
		reviews: {
			type: [reviewSchema],
			required: false,
		},
	},
	{ timestamps: false }
);

const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;
