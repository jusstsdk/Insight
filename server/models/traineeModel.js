const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const courseTraineeSchema = new Schema({
// 	courseID: {
// 		type: Schema.ObjectId, //references courseModel
// 		required: true,
// 	},
// 	exercisesSolved: [reportSchema],
// });

const questionSchema = new Schema({
	question: String,
	grade: Number,
});

const exerciseSchema = new Schema({
	exerciseQuestions: [questionSchema],
	maxGrade: Number, // could be a calculated attribute from total number of questions
	recievedGrade: Number, // could be a calculated attribute from sum of grades
});

// exercises is an array of exercise
// exercise is an array of questions
// questions is an object with question: String and grade: Number
// exercises: [exercise : [{
// 	question: String,
// 	grade: Number
// }]]
// const exerciseTraineeSchema = new Schema({
// 	exerciseID: [], //refrences exerciseModel
// 	grade: Number,
// });

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
			},
		],
	},
	{ timestamps: true }
);

traineeSchema.virtual("domain").get(function () {
	return this.email.slice(this.email.indexOf("@") + 1);
});

traineeSchema
	.virtual("domain")
	.get(function () {
		return `${this.email}`;
	})
	.set(function (v) {
		// `v` is the value being set, so use the value to set
		// `firstName` and `lastName`.
		const domain = v.slice(this.email.indexOf("@") + 1);
		// const lastName = v.substring(v.indexOf(' ') + 1);
		this.set({ domain });
	});

module.exports = mongoose.model("Trainee", traineeSchema);
