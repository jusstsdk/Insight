const express = require("express");

const {
  createTrainee,
  getTrainees,
  getTrainee,
  updateTrainee,
  deleteTrainee,
  payCourse,
  addPaymentMethod,
  deletePaymentMethod,
  requestRefund,
} = require("../controllers/traineeController");

const router = express.Router();

router.post("/", createTrainee);

router.get("/", getTrainees);

router.get("/:id", getTrainee);

router.put("/:id", updateTrainee);

router.delete("/:id", deleteTrainee);
//pay for a course
router.post("/:tId/courses/:cId/payment", payCourse);
//add a new card to a trainee's payment methods
router.post("/:id/payment", addPaymentMethod);
//delete a card
router.delete("/:tid/payment/:pid", deletePaymentMethod);

router.post("/:traineeId/requestRefund/courses/:courseId", requestRefund);

module.exports = router;
