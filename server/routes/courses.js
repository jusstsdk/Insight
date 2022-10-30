const express = require("express");

const {
	getCourse,
	getCourses,
	updateCourse,
	reportCourse,
	populateReports,
} = require("../controllers/courseController");

const router = express.Router();

// GET all Courses
router.get("/", getCourses);

// GET a course
router.get("/:id", getCourse);

// PUT a Course
router.put("/:id", updateCourse);

// Report a Course
router.put("/:id/report", reportCourse);

// Report a Course
router.get("/:id/report", populateReports);

module.exports = router;
