import { Card, CardGroup, Col, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import Stars from "../Stars";
function InstructorReviewCard(props) {
	return (
		<Card className="my-2">
			<Card.Body>
				<CardGroup as={Row} className="justify-content-between align-items-center">
					<Col lg={8} md={6} sm={8}>
						<Card.Title className="textFit">{props.traineeEmail}</Card.Title>
					</Col>
					<Col className="starsContainer fitWidth" sm={4} md={4} lg={2}>
						<Rating allowFraction="true" initialValue={props.rating} readonly="true" size={20} />
					</Col>
				</CardGroup>
				<Card.Text>{props.review}</Card.Text>
			</Card.Body>
		</Card>
	);
}
export default InstructorReviewCard;
