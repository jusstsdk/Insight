const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		courses: {
			type: [Schema.ObjectId],
			required: false,
		},
		ratings: {
			type: [ratingSchema],
			required: false,
		},
	},
	{ timestamps: true }
);

const ratingSchema = new Schema({
	rating: Number,
	review: String,
	trainee: Schema.ObjectId,
});

const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;
