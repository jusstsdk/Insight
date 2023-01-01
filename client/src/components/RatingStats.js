import { Col, ProgressBar, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
export default function RatingStats({ rating, reviews }) {
	const countStars = (ratings) => {
		let count = [0, 0, 0, 0, 0];
		ratings.map((review) => {
			if (review.rating === 5) count[4] += 1;
			else count[Math.ceil(review.rating) - 1] += 1;
		});
		return count;
	};
	return (
		<Col sm={4}>
			<Row>
				<Col sm={2} className="justify-content-end pe-0 me-2">
					<h1 className="fw-bold specialRating fitWidth ms-auto">{rating.toFixed(1)}</h1>
				</Col>
				<Col className="justify-content-end" sm={4}>
					<Col className="fitWidth mx-auto">
						<Rating allowFraction="true" initialValue={rating} readonly="true" size={16} />
					</Col>

					<h6 className="fitWidth mx-auto specialRating h7">{reviews.length} Ratings</h6>
				</Col>
			</Row>
			{countStars(reviews)
				.reverse()
				.map((bar, i) => (
					<Row>
						<Col sm={2} className="pe-0 ">
							<h6 className="fitWidth h7">{5 - i} stars</h6>
						</Col>
						<Col sm={6} className="align-items-center">
							<ProgressBar className="ratingColor" now={(bar / reviews.length) * 100} />
						</Col>
						<Col sm={3}>
							<h6 className="fitWidth h7 ">
								{((bar / reviews.length) * 100).toFixed(2)} <span className="fw-light">%</span>
							</h6>
						</Col>
					</Row>
				))}
		</Col>
	);
}
