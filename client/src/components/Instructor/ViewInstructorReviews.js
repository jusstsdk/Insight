import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Col, Row, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Stars from "../Stars";
import InstructorReviewCard from "./InstructorReviewCard";
function ViewInstructorReviews() {
	const instructorId = useSelector((state) => state.userReducer.user._id);
	const [Reviews, setReviews] = useState([]);
	const getInstructorReviews = async () => {
		const config = {
			method: "GET",
			url: `http://localhost:4000/api/instructors/${instructorId}/reviews`,
		};
		try {
			const response = await axios(config);
			console.log(response.data.reviews);
			setReviews(response.data.reviews);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getInstructorReviews();
	}, []);
	return (
		<Container className="my-3">
			{/* <h1>hi{console.log(instructorId)}</h1> */}
			{/* <Stars stars={1} /> */}
			<Col lg={8} className="d-flex flex-column justify-content-center m-auto">
				{Reviews.map((review) => (
					<>
						<InstructorReviewCard
							traineeEmail={review.trainee.email}
							review={review.review}
							rating={review.rating}
						/>
					</>
				))}
			</Col>
		</Container>
	);
}
export default ViewInstructorReviews;
