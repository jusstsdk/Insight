import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

function CourseTitle(props) {
	const course = props.course;

	function continueCourse() {
		alert("no");
	}

	return (
		<Container>
			<Row>
				<Col>
					<h1 style={{ display: "inline-block" }} key="titleHeader">
						{course.title + " "}
					</h1>
					&nbsp;&nbsp;&nbsp;&nbsp;
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
				<Col>
					<Rating
						allowFraction="true"
						initialValue={course.rating}
						readonly="true"
						size={25}
						/* Available Props */
					/>
				</Col>
				<Col>
					<Button
						style={{ alignSelf: "flex-end", marginLeft: "auto" }}
						onClick={continueCourse}
					>
						Continue Course
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default CourseTitle;
