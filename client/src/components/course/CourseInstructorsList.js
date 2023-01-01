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
			<ListGroup key="Group " variant="flush">
				{instructors &&
					instructors.map((instructor, i) => {
						return (
							<ListGroup.Item bg="primary" key={"Instructor " + i + instructor}>
								{/* Instructor Info */}
								<Row sm={12} className=" align-items-center">
									<h5 className="fst-italic fitWidth my-auto ps-0">Instructor</h5>
									<h6 className="lead fitWidth my-auto">
										{instructor.username} {instructor.username}
									</h6>

									{/* Ratings */}
									<div className="d-flex fitWidth">
										<Rating
											className="fitWidth"
											allowFraction="true"
											initialValue={instructor.rating}
											readonly="true"
											size={22}
										/>
										<h5 className="fitWidth my-auto ms-2 fw-bold ratingColor">
											{instructor.rating}
										</h5>
										<h6 href="#courseReviews" className="ms-2 text-muted my-auto">
											({instructor.reviews.length} Ratings)
										</h6>
									</div>
									{/* Courses */}
									<div className="d-flex align-items-center fitWidth">
										<BsBook className="" size={22} />
										<h6 className="ms-2 my-auto fitWidth text-muted">
											{instructor.courses.length} Courses
										</h6>
									</div>
									{/* View Instructor */}
									<Button
										variant="link"
										className="fitWidth"
										onClick={() =>
											navigate(`/${userType.toLowerCase()}/viewInstructor/${instructor._id}`, {
												state: { instructorId: instructor._id },
											})
										}>
										View
									</Button>
								</Row>
							</ListGroup.Item> //SHOULD BE {instructor.firstName} ONCE WE FIX MODELS
						);
					})}
			</ListGroup>
		</>
	);
}

export default CourseInstructorsList;
