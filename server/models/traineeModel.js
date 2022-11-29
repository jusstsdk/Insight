const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { subtitleSchema, exerciseSchema } = require("./schemas/subtitleSchema");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const paymentMethodSchema = new Schema({
	cardHolder: {
		type: String,
		required: true,
	},
	cardNumber: {
		type: String,
		match: /\d{16}/,
	},
	expiryMonth: {
		type: Number,
		min: 1,
		max: 12,
	},
	expiryYear: {
		type: Number,
		// min: new Date().getUTCFullYear,
		// max: 99,
	},
});

const traineeSchema = new Schema(
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
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: false,
		},
		courses: [
			{
				course: { type: Schema.ObjectId, ref: "Course" },
				subtitles: [subtitleSchema],
				progress: Number, // range from 0.0 to 1.0
				exam: exerciseSchema,
				requestedRefund: Boolean,
				paidPrice: Number,
			},
		],
		paymentMethods: {
			type: [paymentMethodSchema],
			required: false,
		},
		wallet: Number,
	},
	{ timestamps: true }
);

traineeSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, userType: "trainee" },
		process.env.SECRET
	);
	return token;
};

traineeSchema.pre("save", async function (next) {
	this.password = await bcrypt.hash(this.password, 10);
	// calculate progress
	this.courses.forEach((course) => {
		let finishedExercisesAndVideoes = 0;
		let totalExercisesAndVideoes = 0;
		course.progress = 0;
		course.subtitles.forEach((subtitle) => {
			subtitle.videos.forEach((video) => {
				totalExercisesAndVideoes++;
				if (video.isWatched) finishedExercisesAndVideoes++;
			});

			subtitle.exercises.forEach((exercise) => {
				totalExercisesAndVideoes++;
				if (exercise.isSolved) finishedExercisesAndVideoes++;
			});
		});
		course.progress =
			finishedExercisesAndVideoes / totalExercisesAndVideoes;
	});
	next();
});

module.exports = mongoose.model("Trainee", traineeSchema);
