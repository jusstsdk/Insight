import { ListGroup, Col, Row, Button } from "react-bootstrap";
function CourseInstructorsList(props) {
	const instructors = props.instructors;

	return (
		<>
			<ListGroup key="Group " variant="flush">
				<h5>Instructors</h5>
				{instructors &&
					instructors.map((instructor, i) => {
						return (
							<ListGroup.Item bg="primary" key={"Instructor " + i + instructor}>
								<Row>
									<Col>{instructor.username}</Col>
									<Col>
										<Button>View</Button>
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
