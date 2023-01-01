import { ListGroup, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CourseInstructorsList(props) {
	const instructors = props.instructors;
	const navigate = useNavigate();
	const userType = useSelector((state) => state.userReducer.type);

	return (
		<>
			<ListGroup key="Group " variant="flush">
				<h3>Instructors</h3>
				{instructors &&
					instructors.map((instructor, i) => {
						return (
							<ListGroup.Item bg="primary" key={"Instructor " + i + instructor}>
								<Row>
									<Col>
										<p className="lead">{instructor.username}</p>
									</Col>
									<Col>
										<Button
											style={{ float: "right" }}
											onClick={() =>{
												if(userType === "Administrator") {
													navigate("/admin/viewInstructor/" + instructor._id);
												} else {
													navigate(`/${userType.toLowerCase()}/viewInstructor/${instructor._id}`, {
														state: { instructorId: instructor._id },
													})
												}}
											}
										>
											View
										</Button>
									</Col>
								</Row>
							</ListGroup.Item> //SHOULD BE {instructor.firstName} ONCE WE FIX MODELS
						);
					})}
			</ListGroup>
		</>
	);
}

export default CourseInstructorsList;
