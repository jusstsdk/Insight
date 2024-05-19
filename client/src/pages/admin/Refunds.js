import { useState, useEffect } from "react";
import API from "../../functions/api";
import { Badge, Row, Card, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import RefundCard from "../../components/admin/RefundCard";
import { Rating } from "react-simple-star-rating";

const Refunds = () => {
  const user = useSelector((state) => state.userReducer.user);
  const userType = useSelector((state) => state.userReducer.type);

  const [refundCourses, setRefundCourses] = useState([]);
  const token = useSelector((state) => state.userReducer.token);

  async function getRefundCourses() {
    const response = await API.get("/administrators/refunds", {
      headers: { authorization: "Bearer " + token },
    });

    setRefundCourses(response.data);
  }

  useEffect(() => {
    getRefundCourses();
  }, []);
  return (
    <>
      {refundCourses.map((course) => (
        <Card key={course._id} className="mb-3">
          <Card.Header>
            <Row>
              <Card.Title className="courseCardTitle pe-0">
                {course.title}
              </Card.Title>
              <Col sm={4}>
                {course.subjects.map((subject, i) =>
                  i <= 1 ? (
                    <Badge key={"subject_badge_" + i} className="p-2 mx-1 ">
                      {subject}
                    </Badge>
                  ) : (
                    ""
                  ),
                )}
                {course.subjects.length >= 2 && <span>...</span>}
              </Col>
              <Col className="starsContainer fitWidth" sm={4} md={4} lg={2}>
                <Rating
                  key={"stars_" + course._id}
                  id={course._id}
                  allowFraction="true"
                  initialValue={course.rating ? course.rating : 0}
                  readonly="true"
                  size={20}
                />
              </Col>
            </Row>
            {course.status === "Closed" ? (
              <Badge pill bg="dark" className="mx-1 ">
                {course.status}
              </Badge>
            ) : (
              ((userType === "Instructor" &&
                course.instructors.some((courseInstructor) => {
                  return courseInstructor._id === user._id;
                })) ||
                userType === "Administrator") && (
                <Badge
                  pill
                  bg={course.status === "Draft" ? "secondary" : "success"}
                >
                  {course.status}
                </Badge>
              )
            )}
            {course.status === "Published" &&
              course.rank > 0 &&
              course.rank < 6 && (
                <Badge pill bg="danger" className=" mx-1 ">
                  <span style={{ color: "#ffffff" }}>
                    #{course.rank} по популярности
                  </span>
                </Badge>
              )}
          </Card.Header>
          <Card.Body className="d-flex flex-wrap">
            {course.refundRequests.map((request, i) => (
              <Col sm={4} className=" p-1 ">
                <RefundCard
                  key={request._id}
                  request={request}
                  course={course}
                />
              </Col>
            ))}
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default Refunds;
