const express = require("express");

const {
  createTrainee,
  getTrainees,
  getTrainee,
  updateTrainee,
  deleteTrainee,
  subscribeTraineeToCourse,
  requestRefund,
} = require("../controllers/traineeController");

const router = express.Router();

// POST a new administrator
router.post("/", createTrainee);
// POST a new administrator
router.get("/", getTrainees);
// POST a new administrator
router.get("/:id", getTrainee);
// POST a new administrator
router.put("/:id", updateTrainee);
// POST a new administrator
router.delete("/:id", deleteTrainee);

router.post("/:traineeId/requestRefund/courses/:courseId", requestRefund);

module.exports = router;
