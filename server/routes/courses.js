const express = require("express");

const { getCourse, getCourses, updateCourse } = require("../controllers/courseController");

const router = express.Router();

// GET all Courses
router.get("/", getCourses);

// GET a course
router.get("/:id", getCourse);

// PUT a Course
router.put("/:id", updateCourse);

module.exports = router;