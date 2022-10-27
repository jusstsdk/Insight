const express = require("express");

const { getCourses, updateCourse } = require("../controllers/courseController");

const router = express.Router();

// GET all Instructors
router.get("/", getCourses);

// PUT a Course
router.put("/:id", updateCourse);
module.exports = router;
