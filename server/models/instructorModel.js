const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const reviewSchema = require("./schemas/reviewSchema");

const instructorSchema = new Schema(
	{
		username: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		biography: {
			type: String,
			required: false
		},
		country: {
			type: String,
			required: false
		},
		currency: String,
		courses: [{ type: Schema.ObjectId, ref: "Course" }],
		reviews: {
			type: [reviewSchema],
			required: false
		}
	},
	{ timestamps: false }
);

instructorSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, userType: "Instructor" },
		process.env.SECRET
	);
	return token;
};

const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;
