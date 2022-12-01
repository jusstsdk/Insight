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
		enum: ["Trainee", "CorprateTrainee", "Instructor"],
	},
});

const courseSchema = new Schema(
	{
		title: String,
		subjects: [String],
		summary: String,
		originalPrice: Number,
		discount: Number,
		price: Number,
		totalHours: Number,
		previewVideo: String,
		instructors: [{ type: Schema.ObjectId, ref: "Instructor" }],
		subtitles: [subtitleSchema],
		exam: exerciseSchema,
		rating: Number,
		reviews: {
			type: [reviewSchema],
			required: false,
		},
		reports: {
			type: [reportSchema],
			required: false,
		},
		refundRequests: [{ trainee: { type: Schema.ObjectId, ref: "Trainee" }, paidPrice: Number }],
		popularity: Number,
		reports: [reportSchema],
	},
	{ timestamps: true }
);

courseSchema.pre("save", function (next) {
	this.price =
		this.originalPrice - (this.originalPrice * this.discount) / 100;
	this.popularity = this.reviews.length;
	this.totalHours = 0;
	this.subtitles.forEach(subtitle => {
		this.totalHours += subtitle.hours;
	});
	next();
});

module.exports = mongoose.model("Course", courseSchema);