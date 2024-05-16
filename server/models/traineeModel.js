const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { subtitleSchema, exerciseSchema } = require("./schemas/subtitleSchema");
const Schema = mongoose.Schema;

const paymentMethodSchema = new Schema({
  cardHolder: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    match: /\d{16}/,
  },
  expiryMonth: {
    type: Number,
    min: 1,
    max: 12,
  },
  expiryYear: {
    type: Number,
    // min: new Date().getUTCFullYear,
    // max: 99,
  },
});

const traineeSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    isBanned: { type: Boolean, default: false },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: false,
    },
    currency: String,
    courses: [
      {
        course: { type: Schema.ObjectId, ref: "Course" },
        subtitles: [subtitleSchema],
        progress: { type: Number, default: 0 }, // range from 0.0 to 1.0
        exam: exerciseSchema,
        requestedRefund: Boolean,
        paidPrice: Number,
      },
    ],
    paymentMethods: {
      type: [paymentMethodSchema],
      required: false,
    },
    wallet: { type: Number, default: 0 },
  },
  { timestamps: true },
);

traineeSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, userType: "Trainee" },
    process.env.SECRET,
  );
  return token;
};

traineeSchema.pre("save", async function (next) {
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

module.exports = mongoose.model("Trainee", traineeSchema);
