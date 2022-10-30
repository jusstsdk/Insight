const express = require("express");

const { reportCourse, populateReports, getReports } = require("../controllers/reportsController");

const router = express.Router();

// Report a Course
router.put("/:id/report", reportCourse);

// Report a Course
router.get("/:id/report", populateReports);

// Get all Reports
router.get("/", getReports);

module.exports = router;
