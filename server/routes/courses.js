const express = require("express");

const { getCourses } = require("../controllers/courseController");

const router = express.Router();

// GET all Instructors
router.get("/", getCourses);

module.exports = router;
