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
    isBanned: { type: Boolean, default: false },
    country: String,
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
  { timestamps: true },
);

corporateTraineeSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, userType: "CorporateTrainee" },
    process.env.SECRET,
  );
  return token;
};

module.exports = mongoose.model("CorporateTrainee", corporateTraineeSchema);
