const express = require("express");

const {
	reportCourse,
	getCourseWithReports,
	getAllCoursesWithReports,
	updateReportStatus,
	getUserReports,
	updateComments,
} = require("../controllers/reportsController");

const router = express.Router();

// Get a User's Reports
router.get("/authors/:authorId", getUserReports);

// Report a Course
router.post("/courses/:courseId", reportCourse);

// Get a course's reports
router.get("/courses/:courseId", getCourseWithReports);

// Mark a Report
router.put("/:reportId", updateReportStatus);

//Update comments
router.put("/:reportId/comments", updateComments);

// Get all courses with reports
router.get("/", getAllCoursesWithReports);

module.exports = router;
