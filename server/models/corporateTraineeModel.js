const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const { subtitleSchema, exerciseSchema } = require("./schemas/subtitleSchema");

const corporateTraineeSchema = new Schema(
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
		corporate: {
			type: String, //references corporate,
			required: false,
		},
		courses: [
			{
				course: { type: Schema.ObjectId, ref: "Course" },
				subtitles: [subtitleSchema],
				progress: Number, // range from 0.0 to 1.0
				exam: exerciseSchema,
			},
		],
		requests: [
			{
				courseId: { type: Schema.ObjectId, ref: "Course" },
				status: { type: String, default: "Pending" },
			},
		],
	},
	{ timestamps: true }
);

corporateTraineeSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, userType: "CorporateTrainee" },
		process.env.SECRET
	);
	return token;
};

corporateTraineeSchema.pre("save", async function (next) {
	// calculate progress
	this.courses.forEach((course) => {
		let finishedExercisesAndVideos = 0;
		let totalExercisesAndVideos = 0;
		course.progress = 0;
		course.subtitles.forEach((subtitle) => {
			subtitle.videos.foreach((video) => {
				totalExercisesAndVideos++;
				if (video.isWatched) finishedExercisesAndVideos++;
			});

			subtitle.exercises.foreach((exercise) => {
				totalExercisesAndVideos++;
				if (exercise.isSolved) finishedExercisesAndVideos++;
			});
		});
		course.progress = finishedExercisesAndVideos / totalExercisesAndVideos;
	});
	next();
});

module.exports = mongoose.model("CorporateTrainee", corporateTraineeSchema);
