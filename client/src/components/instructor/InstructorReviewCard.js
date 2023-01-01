import { Card, CardGroup, Col, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import Stars from "../Stars";
import { useSelector } from "react-redux";
function InstructorReviewCard(props) {
	const review = props.review;
	const userID = useSelector((state) => state.userReducer.user._id);
	return (
		<>
			<Card className="my-2">
				<Card.Img />
				<Card.Body>
					<CardGroup
						as={Row}
						className="justify-content-between align-items-center"
					>
						<Card.Title>
							<Row>
								<Col lg={8} md={6} sm={8}>
									<h4>
										{review.trainee && review.trainee._id === userID
											? "You"
											: review.trainee
											? review.trainee.firstName + " " + review.trainee.lastName
											: "redacted"}
									</h4>

									{review.updatedAt ? (
										new Date(review.updatedAt).toUTCString() ===
										"Invalid Date" ? (
											""
										) : (
											<h6>{new Date(review.updatedAt).toUTCString()}</h6>
										)
									) : new Date(review.createdAt).toUTCString() ===
									  "Invalid Date" ? (
										""
									) : (
										<h6>{new Date(review.createdAt).toUTCString()}</h6>
									)}
								</Col>
								<Col sm={4} md={4} lg={2}>
									<Rating
										allowFraction="true"
										initialValue={review.rating}
										readonly="true"
										size={20}
										/* Available Props */
									/>
								</Col>
							</Row>
						</Card.Title>
					</CardGroup>
					{review.review && <hr />}
					<Card.Text>{review.review}</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
}
export default InstructorReviewCard;
