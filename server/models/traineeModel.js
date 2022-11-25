const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
				exercises: [exerciseSchema],
				progress: Number // range from 0.0 to 1.0
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Trainee", traineeSchema);
