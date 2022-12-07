const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
	rating: Number,
	review: String,
	trainee: {
		type: Schema.Types.ObjectId,
		required: true,
		refPath: "reviews.traineeType",
	},
	traineeType: {
		type: String,
		required: true,
		enum: ["trainee", "corporateTrainee"],
	},
});

module.exports = reviewSchema;
