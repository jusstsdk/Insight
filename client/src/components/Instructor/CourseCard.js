import { Button, Badge, Card, CardGroup, Col, Row, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import Stars from "../Stars";
function CourseCard(props) {
	const currency = useSelector((state) => state.userReducer.user.currency);
	console.log(currency);
	return (
		<Card className="my-3">
			<Card.Body>
				{/* Title and Stars */}
				<CardGroup as={Row} className=" align-items-center">
					<Card.Title className="courseCardTitle">{props.course.title}</Card.Title>
					<Col sm={6}>
						{props.course.subjects.map((subject, i) => (
							<Badge key={"subject_badge_" + i} className="p-2 mx-1 ">
								{subject}
							</Badge>
						))}
					</Col>
					<Col className="starsContainer" sm={4} md={4} lg={2}>
						<Stars stars={props.course.rating ? props.course.rating : 0} />
					</Col>
				</CardGroup>

				{/* Summary and Price */}
				<CardGroup as={Row} className="mt-2">
					<h6 className="text-muted courseCardLabel">Summary</h6>
					<Col sm={8}>
						<Card.Text>{props.course.summary}</Card.Text>
					</Col>
					<Col sm={2} className="priceContainer d-flex justify-content-end">
						<Card.Text className="priceLabel">
							{props.course.price} {currency}
						</Card.Text>
					</Col>
				</CardGroup>

				{/* Instructors and View Course*/}
				<CardGroup as={Row} className="align-items-center">
					<h6 className="text-muted courseCardLabel my-1">Instructors</h6>
					<Col sm={2}>
						<ListGroup horizontal>
							{props.course.instructors.map((instructor, i) => (
								<a href="#" key={"instructor_" + i} className="mx-1">
									{instructor.username}
								</a>
							))}
						</ListGroup>
					</Col>
					<Col className="viewCourseButton d-flex  justify-content-end" sm={2} md={2} lg={2}>
						<Button>View Course</Button>
					</Col>
				</CardGroup>
			</Card.Body>
		</Card>
	);
}
export default CourseCard;
