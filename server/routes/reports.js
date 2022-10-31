const express = require("express");

const {
	reportCourse,
	populateReports,
	getReports,
	updateReportStatus,
} = require("../controllers/reportsController");

const router = express.Router();

// Report a Course
router.put("/:id/report", reportCourse);

// Get all Courses
router.get("/:id/report", populateReports);

// Mark a Report
router.put("/:id", updateReportStatus);

// Get all Reports
router.get("/", getReports);

module.exports = router;
