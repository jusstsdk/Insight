const Instructor = require("../models/instructorModel");
const Course = require("../models/courseModel");
const Trainee = require("../models/traineeModel");
const CorporateTrainee = require("../models/corporateTraineeModel");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

// Get a single course
const getCourse = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: "No such Course (getCourse)" });
  }

  const course = await Course.findById(req.params.id).populate("instructors");

  if (!course) {
    return res.status(404).json({ error: "No such Course (getCourse)" });
  }

  res.status(200).json(course);
};

// Create a new course
const createCourseInstructor = async (req, res) => {
  const instructorId = req.params.id;
  let instructors = req.body.instructors;
  // instructors.push(instructorId);
  if (!mongoose.Types.ObjectId.isValid(instructorId)) {
    return res.status(404).json({ error: "No such instructor" });
  }
  // add to the database
  try {
    const course = await Course.create(req.body);

    // update instructors in db
    await Instructor.updateMany(
      { _id: instructors },
      { $push: { courses: course._id } },
    );
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Filter the courses given by a specific instructor based on a subject or price
const getCoursesInstructor = async (req, res) => {
  // check if valid Id
  let instructorId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(instructorId)) {
    return res.status(404).json({ error: "No such instructor" });
  }

  // create filter query from querystring
  let query = {};
  if (Object.keys(req.query).length > 0) query = { $and: [] };
  if (req.query.maxPrice != null) {
    query["$and"].push({
      price: {
        $lte: req.query.maxPrice,
      },
    });
  }
  if (req.query.minPrice != null) {
    query["$and"].push({
      price: {
        $gte: req.query.minPrice,
      },
    });
  }
  if (req.query.subject != null) {
    query["$and"].push({
      subjects: {
        $elemMatch: { $eq: req.query.subject },
      },
    });
  }

  // create filter query from querystring
  if (req.query.searchQuery != null) {
    query["$and"].push({
      $or: [
        { title: { $regex: req.query.searchQuery, $options: "i" } },
        {
          subjects: {
            $elemMatch: {
              $regex: req.query.searchQuery,
              $options: "i",
            },
          },
        },
        {
          "instructors.username": {
            $regex: req.query.searchQuery,
            $options: "i",
          },
        },
      ],
    });
  }

  // find results
  try {
    const instructor = await Instructor.findById(instructorId).populate({
      path: "courses",
      populate: {
        path: "instructors",
      },
      match: query,
    });
    res.status(200).json({ courses: instructor.courses });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Filter the courses on a subject or price
const getCourses = async (req, res) => {
  // create filter query from querystring
  let query = {};
  if (Object.keys(req.query).length > 0) query = { $and: [] };
  if (req.query.maxPrice != null) {
    query["$and"].push({
      price: {
        $lte: req.query.maxPrice,
      },
    });
  }
  if (req.query.minPrice != null) {
    query["$and"].push({
      price: {
        $gte: req.query.minPrice,
      },
    });
  }

  if (req.query.subject != null) {
    const filters = [];

    req.query.subject.forEach((condition) => {
      filters.push({
        subjects: {
          $elemMatch: {
            $regex: condition,
            $options: "i",
          },
        },
      });
    });

    query["$or"] = filters;
  }

  if (req.query.rating != null) {
    query["$and"].push({
      rating: {
        $gte: req.query.rating,
      },
    });
  }

  // create filter query from querystring
  if (req.query.searchQuery != null) {
    const instructorIds = await Instructor.find(
      { username: { $regex: req.query.searchQuery, $options: "i" } },
      "id",
    );
    query["$and"].push({
      $or: [
        { title: { $regex: req.query.searchQuery, $options: "i" } },
        {
          subjects: {
            $elemMatch: {
              $regex: req.query.searchQuery,
              $options: "i",
            },
          },
        },
        {
          instructors: { $in: instructorIds },
        },
      ],
    });
  }

  if (query["$and"] && query["$and"].length === 0) {
    delete query["$and"];
  }

  // find results
  try {
    const course = await Course.find(query).populate("instructors");
    let rankedCourses = [...course];
    rankedCourses = rankedCourses.filter(
      (course) => course.status === "Published",
    );
    rankedCourses.sort(comparePopularity);
    course.forEach((course) => {
      if (course.status === "Published") {
        course.rank = rankedCourses.indexOf(course) + 1;
        course.save();
      }
    });

    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
function comparePopularity(a, b) {
  if (a.enrolledTrainees.length > b.enrolledTrainees.length) return -1;
  if (a.enrolledTrainees.length < b.enrolledTrainees.length) return 1;
  return 0;
}

// Update a Course
const updateCourse = async (req, res) => {
  let course = await Course.findById(req.params.id);
  course = Object.assign(course, req.body);
  let updatedCourse = await course.save();

  if (!updatedCourse) {
    return res.status(400).json({ error: "No such course (updateCourse)" });
  }

  res.status(200).json(updatedCourse);
};

// Delete a Course
const deleteCourse = async (req, res) => {
  const instructorId = req.params.id;
  const courseId = req.body.courseId;
  await Instructor.updateOne(
    { _id: instructorId },
    { $pull: { courses: courseId } },
  );
  let course = await Course.deleteOne({ _id: courseId });
  if (!course) {
    return res.status(400).json({ error: "No such course (updateCourse)" });
  }

  res.status(200).json(course);
};

// Report a Course
const reportCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        $push: { reports: req.body },
      },
      { new: true },
    );
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const populateReports = async (req, res) => {
  // find results
  try {
    const course = await Course.findById(req.params.id).populate(
      "reports.author",
    );
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getReports = async (req, res) => {
  // find results
  try {
    const course = await Course.find({
      reports: { $exists: true, $ne: [] },
    }).populate({
      path: "reports.author",
    });
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: "error.message " });
  }
};

const reviewCourse = async (req, res) => {
  let courseId = req.params.id;
  let course = await Course.findById(courseId).then(async (course) => {
    if (!course) {
      return res.status(400).json({ error: "No such course" });
    }
    course.reviews.some((review, i) => {
      if (review.trainee.toString() === req.body.trainee) {
        course.reviews.splice(i, 1);
      }
    });
    course.reviews.push(req.body);
    await course.save();
    return course;
  });
  if (!course) {
    return res.status(400).json({ error: "No such course" });
  }
  try {
    course = await Course.findById(courseId).populate({
      path: "reviews.trainee",
    });
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ error: error.message });
  }
};

// Get course and populate review author
const getCourseWithReviews = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate({
      path: "reviews.trainee",
    });
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// set promotion for all provided course ids
async function promotionCourses(req, res) {
  const courses = req.body.courses;

  courses.forEach(async (courseId) => {
    const course = await Course.findById(courseId);
    course.promotion = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      discount: req.body.discount,
      offeredBy: req.body.offeredBy,
    };
    course.save();
  });

  res.sendStatus(200);
}

// updates isWatched to true in trainee.courses.subtitles.videos
const watchVideo = async (req, res) => {
  const traineeId = req.params.id;
  const userType = req.body.userType;
  const courseIndex = req.body.courseIndex;
  const subtitleIndex = req.body.subtitleIndex;
  const videoIndex = req.body.videoIndex;
  let trainee;
  if (userType === "Trainee") trainee = await Trainee.findById(traineeId);
  else trainee = await CorporateTrainee.findById(traineeId);

  trainee.courses[courseIndex].subtitles[subtitleIndex].videos[
    videoIndex
  ].isWatched = true;
  await trainee.save();
  res.status(200).json(trainee);
};

// adds Note to a Video's Notes
const addNoteToVideoNotes = async (req, res) => {
  const traineeId = req.params.id;
  const userType = req.body.userType;
  const courseIndex = req.body.courseIndex;
  const subtitleIndex = req.body.subtitleIndex;
  const videoIndex = req.body.videoIndex;
  const note = req.body.note;
  let trainee;
  if (userType === "Trainee") trainee = await Trainee.findById(traineeId);
  else trainee = await CorporateTrainee.findById(traineeId);

  trainee.courses[courseIndex].subtitles[subtitleIndex].videos[
    videoIndex
  ].notes = [
    ...trainee.courses[courseIndex].subtitles[subtitleIndex].videos[videoIndex]
      .notes,
    note,
  ];
  trainee.save();
  res.status(200).json(trainee);
};

// deletes a Note from a Video's Notes
const deleteNoteFromVideoNotes = async (req, res) => {
  const traineeId = req.params.id;
  const userType = req.body.userType;
  const courseIndex = req.body.courseIndex;
  const subtitleIndex = req.body.subtitleIndex;
  const videoIndex = req.body.videoIndex;
  const noteIndex = req.body.noteIndex;
  let trainee;
  if (userType === "Trainee") trainee = await Trainee.findById(traineeId);
  else trainee = await CorporateTrainee.findById(traineeId);
  let newNotes = trainee.courses[courseIndex].subtitles[subtitleIndex].videos[
    videoIndex
  ].notes.filter((_, i) => i !== noteIndex);
  trainee.courses[courseIndex].subtitles[subtitleIndex].videos[
    videoIndex
  ].notes = newNotes;
  trainee.save();
  res.status(200).json(trainee);
};

// updates the user's choices for an exercise
const solveExercise = async (req, res) => {
  const traineeId = req.params.id;
  const userType = req.body.userType;
  const courseIndex = req.body.courseIndex;
  const subtitleIndex = req.body.subtitleIndex;
  const exerciseIndex = req.body.exerciseIndex;
  const questions = req.body.questions;
  let trainee;
  if (userType === "Trainee") trainee = await Trainee.findById(traineeId);
  else trainee = await CorporateTrainee.findById(traineeId);

  console.log(trainee.courses[courseIndex].subtitles[subtitleIndex]);

  trainee.courses[courseIndex].subtitles[subtitleIndex].exercises[
    exerciseIndex
  ].isSolved = true;
  trainee.courses[courseIndex].subtitles[subtitleIndex].exercises[
    exerciseIndex
  ].questions = questions;
  await trainee.save();
  res.status(200).json(trainee);
};

// updates the user's choices for an exam
const solveExam = async (req, res) => {
  const traineeId = req.params.id;
  const userType = req.body.userType;
  const courseIndex = req.body.courseIndex;
  const questions = req.body.questions;
  let trainee;
  if (userType === "Trainee") trainee = await Trainee.findById(traineeId);
  else trainee = await CorporateTrainee.findById(traineeId);
  trainee.courses[courseIndex].exam.isSolved = true;
  trainee.courses[courseIndex].exam.questions = questions;
  await trainee.save();
  res.status(200).json(trainee);
};

// send the certificate to the user when he/she finsihes the course
const sendCertificate = (req, res) => {
  let mailTransporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  let mailDetails = {
    from: "You have completed a Course",
    to: `${req.body.email}`,
    subject: `You have completed the Course: ${req.body.courseTitle}`,
    text: "Here is your Certificate",
    attachments: [
      {
        filename: "Certificate.pdf",
        path: "./Certificate.pdf",
        contentType: "application/pdf",
      },
    ],
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports = {
  getCourse,
  getCourseWithReviews,
  getCourses,
  createCourseInstructor,
  getCoursesInstructor,
  updateCourse,
  deleteCourse,
  reportCourse,
  populateReports,
  getReports,
  reviewCourse,
  promotionCourses,
  sendCertificate,
  watchVideo,
  addNoteToVideoNotes,
  deleteNoteFromVideoNotes,
  solveExercise,
  solveExam,
};
