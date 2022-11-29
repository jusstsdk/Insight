const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const { subtitleSchema, exerciseSchema } = require("./schemas/subtitleSchema");
const bcrypt = require("bcrypt");

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
				paidPrice: Number,
				requestedRefund: Boolean,
			},
		],
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
			subtitle.videos.foreach((video) => {
				totalExercisesAndVideoes++;
				if (video.isWatched) finishedExercisesAndVideoes++;
			});

			subtitle.exercises.foreach((exercise) => {
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
