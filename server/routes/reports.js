const express = require("express");

const {
	reportCourse,
	populateReports,
	getReports,
	updateReportStatus,
	getUserReports,
} = require("../controllers/reportsController");

const router = express.Router();

// Get a User's Reports
router.get("/authors/:authorId", getUserReports);

// Report a Course
router.post("/courses/:courseId", reportCourse);

// Get all Courses
router.get("/courses/:courseId", populateReports);

// Mark a Report
router.put("/:reportId", updateReportStatus);

// Get all Reports
router.get("/", getReports);

module.exports = router;
