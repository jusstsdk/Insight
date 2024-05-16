const express = require("express");
const {
  getCorporateTrainees,
  getCorporateTrainee,
  createCorporateTrainee,
  deleteCorporateTrainee,
  updateCorporateTrainee,
  requestCourseAccess,
} = require("../controllers/corporateTraineeController");
const ban = require("../middleware/ban");

const router = express.Router();

//GET all Corporate_trainees
router.get("/", getCorporateTrainees);

//GET a single Corporate_trainee
router.get("/:id", getCorporateTrainee);

//POST a new Corporate_trainee
router.post("/", createCorporateTrainee);

//DELETE a Corporate_trainee
router.delete("/:id", deleteCorporateTrainee);

//UPDATE a  Corporate_trainee
router.put("/:id", updateCorporateTrainee);

//REQUEST course access
router.post("/:id/request", requestCourseAccess);

module.exports = router;
