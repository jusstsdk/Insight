import { Card, CardGroup, Col, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import Stars from "../Stars";
import { useSelector } from "react-redux";
function InstructorReviewCard(props) {
	const review = props.review;
	const userID = useSelector((state) => state.userReducer.user._id);
	const ReviewHeader = (review) => {
		return (
			<>
				<h5 className="fitWidth">
					{review.trainee && review.trainee._id === userID
						? "You"
						: review.trainee
						? review.trainee.firstName + " " + review.trainee.lastName
						: "redacted"}
				</h5>
				{review.updatedAt ? (
					new Date(review.updatedAt).toUTCString() === "Invalid Date" ? (
						""
					) : (
						<h6 className="fitWidth text-muted ps-0 h7 align-self-end ">
							{new Date(review.updatedAt).toUTCString()}
						</h6>
					)
				) : new Date(review.createdAt).toUTCString() === "Invalid Date" ? (
					""
				) : (
					<h6 className="fitWidth">{new Date(review.createdAt).toUTCString()}</h6>
				)}
			</>
		);
	};
	return (
		<>
			<Card key={review._id} className="mb-2">
				<Card.Body>
					<CardGroup as={Row} className="justify-content-between align-items-center mb-2">
						<Card.Title>
							<Row sm={10}>
								{ReviewHeader(review)}
								<Col className="ms-auto justify-contend-end fitWidth" sm={2}>
									<Rating
										className="fitWidth starsContainer"
										allowFraction="true"
										initialValue={review.rating}
										readonly="true"
										size={20}
									/>
								</Col>
							</Row>
						</Card.Title>
					</CardGroup>
					<Card.Text>{review.review}</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
}
export default InstructorReviewCard;
