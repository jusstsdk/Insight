const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = require("./schemas/reviewSchema");
const subtitleSchemaModule = require("./schemas/subtitleSchema");
const subtitleSchema = subtitleSchemaModule.subtitleSchema;
const exerciseSchema = subtitleSchemaModule.exerciseSchema;

const reportSchema = new Schema({
	title: String,
	type: {
		type: String,
		required: true,
		enum: ["Technical", "Financial", "Other"],
	},
	isResolved: Boolean,
	isSeen: Boolean,
	description: String,
	author: {
		type: Schema.Types.ObjectId,
		required: true,
		refPath: "reports.authorType",
	},
	authorType: {
		type: String,
		required: true,
		enum: ["trainee", "corporateTrainee", "instructor"],
	},
});

const courseSchema = new Schema(
	{
		title: String,
		subjects: [String],
		summary: String,
		originalPrice: Number,
		discount: {
			type: Number,
			default: 0,
		},
		price: Number,
		totalHours: Number,
		previewVideo: String,
		instructors: [{ type: Schema.ObjectId, ref: "Instructor" }],
		subtitles: [subtitleSchema],
		exam: exerciseSchema,
		rating: Number,
		reviews: [reviewSchema],
		reports: [reportSchema],
		refundRequests: [
			{
				trainee: { type: Schema.ObjectId, ref: "Trainee" },
				paidPrice: Number,
			},
		],
		popularity: Number,
	},
	{ timestamps: true }
);

courseSchema.pre("save", function (next) {
	this.price =
		this.originalPrice - (this.originalPrice * this.discount) / 100;
	this.popularity = this.reviews.length;
	this.totalHours = 0;
	let totalRatingsValue = 0;
	this.reviews.forEach((review) => {
		totalRatingsValue += review.rating;
	});
	this.rating = totalRatingsValue / this.reviews.length;
	this.subtitles.forEach((subtitle) => {
		this.totalHours += subtitle.hours;
	});
	next();
});

module.exports = mongoose.model("Course", courseSchema);
