import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { useSelector } from "react-redux";

function CourseTitle(props) {
	const course = props.course;
	const ownsCourse = props.ownsCourse;

	const userType = useSelector((state) => state.userReducer.type);

	function continueCourse() {
		alert("no");
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
									<>
										<Badge
											bg="info"
											key={"Badge of Subject: " + i + eachSubject}
											className="lead"
										>
											{eachSubject}
										</Badge>
										&nbsp;
									</>
								);
							})}
						</Col>
					</Row>
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
					{(userType === "Administrator" || ownsCourse) && (
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
