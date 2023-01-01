const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const reviewSchema = require("./schemas/reviewSchema");
const monthlyPaySchema = new Schema(
	{
		amount: {
			type: Number,
			default: 0,
		},
	},
	{ _id: false, timestamps: true }
);

const instructorSchema = new Schema(
	{
		username: String,
		password: String,
		email: String,
		firstName: String,
		lastName: String,
		gender: String,
		country:String,
		biography: String,
		courses: [{ type: Schema.ObjectId, ref: "Course" }],
		reviews: [reviewSchema],
		monthlyPay: {
			type: monthlyPaySchema,
			default: {
				amount: 0,
			},
		},
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
