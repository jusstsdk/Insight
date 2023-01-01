const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const { subtitleSchema, exerciseSchema } = require("./schemas/subtitleSchema");

const corporateTraineeSchema = new Schema(
	{
		username: String,
		password: String,
		email: String,
		firstName: String,
		lastName: String,
		gender: String,
		country:String,
		corporate: String,
		courses: [
			{
				course: { type: Schema.ObjectId, ref: "Course" },
				subtitles: [subtitleSchema],
				progress: { type: Number, default: 0 }, // range from 0.0 to 1.0
				exam: exerciseSchema,
			},
		],
		requests: [
			{
				courseId: { type: Schema.ObjectId, ref: "Course" },
				status: { type: String, default: "Pending" },
				enum: ["Pending", "Rejected", "Accepted"],
			},
		],
	},
	{ timestamps: true }
);

corporateTraineeSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id, userType: "CorporateTrainee" }, process.env.SECRET);
	return token;
};

corporateTraineeSchema.pre("save", async function (next) {
	// calculate progress
	this.courses.forEach((course) => {
		let finishedVideos = 0;
		let totalVideos = 0;
		course.progress = 0;
		course.subtitles.forEach((subtitle) => {
			subtitle.videos.forEach((video) => {
				totalVideos++;
				if (video.isWatched) finishedVideos++;
			});
		});
		course.progress = finishedVideos / totalVideos;
	});
	next();
});

module.exports = mongoose.model("CorporateTrainee", corporateTraineeSchema);
