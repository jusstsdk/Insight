import { ListGroup, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { BsBook } from "react-icons/bs";

function CourseInstructorsList(props) {
	const instructors = props.instructors;
	const navigate = useNavigate();
	const userType = useSelector((state) => state.userReducer.type);

	return (
		<>
			{instructors &&
				instructors.map((instructor, i) => {
					return (
						<Row key={`instructor_${instructor._id}_${i}`} className="align-items-center mb-3">
							<Col
								sm={4}
								className="mb-auto d-flex justify-content-start fst-italic fitWidth fitHeight  ">
								<h5>Instructor</h5>
							</Col>
							<Col sm={8}>
								{/* View Instructor */}
								<Row>
									<a
										className="fitWidth"
										onClick={() =>
											navigate(`/${userType.toLowerCase()}/viewInstructor/${instructor._id}`, {
												state: { instructorId: instructor._id },
											})
										}>
										<h6 className="lead fitWidth my-auto">
											{instructor.username} {instructor.username}
										</h6>
									</a>
									{/* Courses */}
									<div className="d-flex align-items-center fitWidth">
										<BsBook key={"book_" + instructor._id} size={22} />
										<h6 className="ms-2 my-auto fitWidth text-muted">
											{instructor.courses.length} Courses
										</h6>
									</div>
								</Row>

								{/* Ratings */}
								<div className="d-flex fitWidth">
									<Rating
										key={"rating_" + instructor._id}
										className="fitWidth"
										allowFraction="true"
										initialValue={instructor.rating}
										readonly="true"
										size={22}
									/>
									<h5 className="fitWidth my-auto ms-2 fw-bold ratingColor">{instructor.rating}</h5>
									<h6 href="#courseReviews" className="ms-2 text-muted my-auto">
										({instructor.reviews.length} Ratings)
									</h6>
								</div>
							</Col>
						</Row>
					);
				})}
		</>
	);
}

export default CourseInstructorsList;
