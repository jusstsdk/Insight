const express = require("express");

const {
	getCourse,
	getCourses,
	updateCourse,
	reportCourse,
	populateReports,
	getReports,
	reviewCourse,
	promotionCourses
} = require("../controllers/courseController");

const router = express.Router();

// Report a Course
router.get("/reports", getReports);

// Add a promotion
router.post("/promotion", promotionCourses)

// Report a Course
router.put("/:id/report", reportCourse);

// Report a Course
router.get("/:id/report", populateReports);

// GET a course
router.get("/:id", getCourse);

// PUT a Course
router.put("/:id", updateCourse);

// GET all Courses
router.get("/", getCourses);

// Review a Course
router.post("/:id/review", reviewCourse);

module.exports = router;
