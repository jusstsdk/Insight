const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {subtitleSchema, exerciseSchema} = require("./schemas/subtitleSchema");

const corprateTraineeSchema = new Schema(
	{
		username: {
			type: String,
			required: false,
		},
		password: {
			type: String,
			required: false,
		},
		email: {
			type: String,
			required: false,
		},
		country: {
			type: String,
			required: false,
		},
		corperate: {
			type: String, //references corprate,
			required: false,
		},
		courses: [
			{
				course: { type: Schema.ObjectId, ref: "Course" },
				subtitles: [subtitleSchema],
				progress: Number, // range from 0.0 to 1.0
				exam: exerciseSchema
			},
		]
	},
	{ timestamps: true }
);

corprateTraineeSchema.pre("save", function (next) {
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
	});
	next();
});

module.exports = mongoose.model("CorprateTrainee", corprateTraineeSchema);