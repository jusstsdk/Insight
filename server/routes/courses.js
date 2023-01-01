const express = require("express");

const {
	getCourse,
	getCourses,
	updateCourse,
	deleteCourse,
	reportCourse,
	populateReports,
	getReports,
	reviewCourse,
	promotionCourses,
	watchVideo,
	addNoteToVideoNotes,
	deleteNoteFromVideoNotes,
	solveExercise,
	solveExam,
	sendCertificate,
	getCourseWithReviews,
} = require("../controllers/courseController");

const router = express.Router();

// Mark video as Watched
router.put("/:id/watchVideo", watchVideo);

// Add Note while watcing Video
router.put("/:id/addNoteToVideoNotes", addNoteToVideoNotes);

// Delete Note while watching Video
router.put("/:id/deleteNoteFromVideoNotes", deleteNoteFromVideoNotes);

// Solve an Exercise
router.put("/:id/solveExercise", solveExercise);

// Solve an Exam
router.put("/:id/solveExam", solveExam);

// Send Certificate
router.post("/sendCertificate", sendCertificate);

// Report a Course
router.get("/reports", getReports);

// Add a promotion
router.post("/promotion", promotionCourses);

// Report a Course
router.put("/:id/report", reportCourse);

// Report a Course
router.get("/:id/report", populateReports);

// GET a course
router.get("/:id", getCourse);

// PUT a Course
router.put("/:id", updateCourse);

// DELETE a Course
router.delete("/:id", deleteCourse);

// GET all Courses
router.get("/", getCourses);

// Review a Course
router.post("/:id/review", reviewCourse);

// Get all reviews
router.get("/:id/fullCourse", getCourseWithReviews);

module.exports = router;
