import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import InstructorReviewCard from "../../components/instructor/InstructorReviewCard";
function ViewInstructorReviews() {
	const instructorId = useSelector((state) => state.userReducer.user._id);
	const [Reviews, setReviews] = useState([]);

	// Gets all Instructor's Review populated with Trainee's information.
	const getInstructorReviews = async () => {
		const config = {
			method: "GET",
			url: `http://localhost:4000/api/instructors/${instructorId}/reviews`,
		};
		try {
			const response = await axios(config);
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
			<Col lg={8} className="d-flex flex-column justify-content-center m-auto">
				{Reviews.map((review) => (
					<InstructorReviewCard
						key={"review_" + review.trainee.email}
						traineeEmail={review.trainee.email}
						review={review.review}
						rating={review.rating}
					/>
				))}
			</Col>
		</Container>
	);
}
export default ViewInstructorReviews;
