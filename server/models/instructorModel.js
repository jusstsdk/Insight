const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

instructorSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, userType: "instructor" },
		process.env.SECRET
	);
	return token;
};

instructorSchema.pre("save", async function (next) {
	this.password = await bcrypt.hash(this.password, 10);
});

const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;
