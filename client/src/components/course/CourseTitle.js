import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CorpTraineeRequestCourseAlert from "./CorpTraineeCourseRequestAlert";
import InstructorPriceAlert from "./InstructorPriceAlert";
import TraineeCoursePriceAlert from "./TraineeCoursePriceAlert";
import React from "react";

function CourseTitle({
  course,
  traineeOwnsCourse,
  traineeVersionOfCourse,
  corpTraineeOwnsCourse,
  corpTraineeVersionOfCourse,
}) {
  const ExchangeRate = useSelector(
    (state) => state.userReducer.user.exchangeRate,
  );

  const userType = useSelector((state) => state.userReducer.type);
  console.log(course);

  return (
    <Row>
      <Col sm={8}>
        <Row className={"align-items-center"}>
          <h1 className="fitWidth">{course.title}</h1>

          <Col sm={"auto"}>
            <div
              className={
                "d-flex flex-md-row flex-sm-column flex-row gap-2 mb-md-0 mb-2"
              }
            >
              {course.rank > 0 && course.status === "Published" ? (
                <Badge bg="warning" className="lead  fitHeight fs-6">
                  #{course.rank} in Popularity
                </Badge>
              ) : (
                <></>
              )}

              {course.previewVideo !== "" && (
                <Badge bg="danger" className="p-2 mx-1">
                  Курс содержит видео
                </Badge>
              )}
            </div>
          </Col>
        </Row>
        <Col className="d-flex flex-wrap">
          {course.subjects.map((eachSubject, i) => {
            return (
              <Badge
                bg="info"
                key={"Badge of Subject: " + i + eachSubject}
                className="lead me-1  mb-2 fitWidth"
              >
                {eachSubject}
              </Badge>
            );
          })}
        </Col>
      </Col>
      <Col sm={4} className="d-flex flex-column align-items-end">
        {/* Ratings */}
        <div className="d-flex fitWidth mb-2 text-nowrap">
          <a href="#courseReviews" className="ms-2 mb-0 text-muted my-auto">
            ({course.reviews.length} Ratings)
          </a>
          <h5 className="fitWidth  mb-0 mt-auto ms-2 fw-bold ratingColor">
            {course.rating}
          </h5>
          <Rating
            key={`${course._id}_reviews`}
            className="fitWidth"
            allowFraction="true"
            initialValue={course.rating}
            readonly="true"
            size={22}
          />
        </div>
        {userType === "CorporateTrainee" ? (
          !corpTraineeOwnsCourse && (
            <CorpTraineeRequestCourseAlert
              course={course}
            ></CorpTraineeRequestCourseAlert>
          )
        ) : userType === "Trainee" ? (
          !traineeOwnsCourse && (
            <TraineeCoursePriceAlert
              course={course}
              traineeOwnsCourse={traineeOwnsCourse}
              traineeVersionOfCourse={traineeVersionOfCourse}
            ></TraineeCoursePriceAlert>
          )
        ) : (
          <InstructorPriceAlert course={course}></InstructorPriceAlert>
        )}
      </Col>
    </Row>
  );
}

export default CourseTitle;
