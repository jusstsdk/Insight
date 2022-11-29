const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { subtitleSchema, exerciseSchema } = require("./schemas/subtitleSchema");

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

traineeSchema.pre("save", function (next) {
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
	});
	next();
});

module.exports = mongoose.model("Trainee", traineeSchema);
