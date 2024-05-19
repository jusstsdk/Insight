import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Rating } from "react-simple-star-rating";
import CorpTraineeRequestCourseAlert from "../../components/course/CorpTraineeCourseRequestAlert";
import TraineeCoursePriceAlert from "../../components/course/TraineeCoursePriceAlert";
import CourseProgress from "./CourseProgress";
import CourseData from "./CourseData";
import InstructorPriceAlert from "./InstructorPriceAlert";

import { AiFillClockCircle } from "react-icons/ai";
import { HiUsers } from "react-icons/hi";
function CourseBasicInfo(props) {
  const course = props.course;
  const instructors = props.instructors;

  const traineeOwnsCourse = props.traineeOwnsCourse;
  const traineeVersionOfCourse = props.traineeVersionOfCourse;
  const traineeAlreadyRequestedRefund = props.traineeAlreadyRequestedRefund;

  const corpTraineeOwnsCourse = props.corpTraineeOwnsCourse;
  const corpTraineeVersionOfCourse = props.corpTraineeVersionOfCourse;

  const userType = useSelector((state) => state.userReducer.type);

  return (
    <>
      <CourseProgress
        course={course}
        ownsCourse={
          userType === "Trainee" ? traineeOwnsCourse : corpTraineeOwnsCourse
        }
        hisVersionOfCourse={
          userType === "Trainee"
            ? traineeVersionOfCourse
            : corpTraineeVersionOfCourse
        }
        traineeAlreadyRequestedRefund={traineeAlreadyRequestedRefund}
      ></CourseProgress>

      <Row>
        <h3 className="fst-italic fitWidth">Основная информация</h3>
        {/* Stats */}
        <Col className="d-flex justify-content-end mt-2 mb-3">
          {/* Students */}
          <div className="d-flex align-items-center fitWidth">
            <HiUsers size={30} />
            <h5 className="ms-2 my-auto fitWidth fw-light">
              {course.enrolledTrainees.length} студентов
            </h5>
          </div>
        </Col>
      </Row>

      <Row>
        <CourseData course={course} instructors={instructors}></CourseData>
      </Row>
    </>
  );
}

export default CourseBasicInfo;
