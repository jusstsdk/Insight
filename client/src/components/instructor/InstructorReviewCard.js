import { Card, CardGroup, Col, Row } from "react-bootstrap";
import Stars from "../Stars";
function InstructorReviewCard(props) {
	return (
		<Card className="my-2">
			<Card.Body>
				<CardGroup as={Row} className="justify-content-between align-items-center">
					<Col lg={8} md={6} sm={8}>
						<Card.Title className="textFit">{props.traineeEmail}</Card.Title>
					</Col>
					<Col sm={4} md={4} lg={2}>
						<Stars stars={props.rating} />
					</Col>
				</CardGroup>
				<Card.Text>{props.review}</Card.Text>
			</Card.Body>
		</Card>
	);
}
export default InstructorReviewCard;
