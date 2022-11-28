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
router.get("/:authorId/reports", getUserReports);

// Report a Course
router.post("/:courseId/report", reportCourse);

// Get all Courses
router.get("/:id/report", populateReports);

// Mark a Report
router.put("/:id", updateReportStatus);

// Get all Reports
router.get("/", getReports);

module.exports = router;
