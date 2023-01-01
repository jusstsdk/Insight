import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CourseTitle(props) {
	const navigate = useNavigate();
	const course = props.course;
	const ownsCourse = props.ownsCourse;

	const traineeAlreadyRequestedRefund = props.traineeAlreadyRequestedRefund;

	const userType = useSelector((state) => state.userReducer.type);

	function continueCourse() {
		navigate("continueCourse", {
			state: {
				course: { _id: props.course._id, title: props.course.title },
			},
		});
	}

	return (
		<Container>
			<Row>
				<Col md="auto">
					<Row>
						<h1 style={{ display: "inline-block" }} key="titleHeader">
							{course.title + " "}
						</h1>
					</Row>
					<Row>
						<Col>
							{course.subjects.map((eachSubject, i) => {
								return (
									<Badge
										bg="dark"
										key={"Badge of Subject: " + i + eachSubject}
										className="lead me-1"
									>
										{eachSubject}
									</Badge>
								);
							})}
						</Col>
					</Row>
				</Col>
				<Col>
					<Badge bg="warning" className="lead me-1">
						#{course.rank}
						{/* {course.rank % 10 === 1
							? "st"
							: course.rank % 10 === 2
							? "nd"
							: course.rank % 10 === 3
							? "rd"
							: "th"} */}
					</Badge>
				</Col>
				<Col>
					<Rating
						allowFraction="true"
						initialValue={course.rating}
						readonly="true"
						size={22}
						/* Available Props */
					/>
				</Col>
				<Col>
					{ownsCourse && !traineeAlreadyRequestedRefund && (
						<Button style={{ float: "right" }} onClick={continueCourse}>
							Continue Course
						</Button>
					)}
				</Col>
			</Row>
		</Container>
	);
}

export default CourseTitle;
