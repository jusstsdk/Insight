import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CourseTitle(props) {
	const navigate = useNavigate();
	const course = props.course;
	const ownsCourse = props.ownsCourse;

	const traineeAlreadyRequestedRefund = props.traineeAlreadyRequestedRefund;

	const ExchangeRate = useSelector((state) => state.userReducer.user.exchangeRate);

	function continueCourse() {
		navigate("continueCourse", {
			state: {
				course: { _id: props.course._id, title: props.course.title },
			},
		});
	}

	return (
		<Row>
			<Col sm={8}>
				<Row>
					<h1 className="fitWidth">{course.title}</h1>
					<Col sm={1} className="d-flex">
						<Badge bg="warning" className="lead m-auto fitWidth fitHeight fs-6">
							#{course.rank}
						</Badge>
					</Col>
				</Row>
				<Row>
					<Col sm={8} className="d-flex flex-wrap">
						{course.subjects.map((eachSubject, i) => {
							return (
								<Badge
									bg="info"
									key={"Badge of Subject: " + i + eachSubject}
									className="lead me-1 fs-6 mb-2 fitWidth">
									{eachSubject}
								</Badge>
							);
						})}
					</Col>
				</Row>
			</Col>
			{/* <Col>
				<Rating allowFraction="true" initialValue={course.rating} readonly="true" size={22} />
			</Col> */}
			{ownsCourse && !traineeAlreadyRequestedRefund && (
				<Col>
					<Button style={{ float: "right" }} onClick={continueCourse}>
						Continue Course
					</Button>
				</Col>
			)}
		</Row>
	);
}

export default CourseTitle;
