const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseTraineeSchema = new Schema({
	exerciseID: Schema.ObjectId, //refrences exerciseModel
	grade: Number,
});

const courseTraineeSchema = new Schema({
	courseId: { type: Schema.ObjectId, ref: "Course" },
	exercisesSolved: [exerciseTraineeSchema],
});

const corprateTraineeSchema = new Schema(
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
		corperate: {
			type: String, //references corprate,
			required: true,
		},
		courses: {
			type: [courseTraineeSchema],
			required: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("CorprateTrainee", corprateTraineeSchema);
