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
				subtitles: [subtitleSchema],
				progress: Number // range from 0.0 to 1.0
			},
		],
	},
	{ timestamps: true }
);

traineeSchema.pre("save", function (next) {
	this.courses.forEach(course => {
		// progress from subtitleSchema
	});
});

module.exports = mongoose.model("Trainee", traineeSchema);
