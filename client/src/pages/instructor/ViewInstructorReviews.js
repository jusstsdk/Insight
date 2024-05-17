import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import InstructorReviewCard from "../../components/instructor/InstructorReviewCard";
import RatingStats from "../../components/RatingStats";
import Pagination from "../../components/shared/pagination/Pagination";
import "../../components/shared/pagination/style.scss";

let pageSize = 2;
function ViewInstructorReviews() {
	const instructorId = useSelector((state) => state.userReducer.user._id);
	const rating = useSelector((state) => state.userReducer.user.rating);

	const [Reviews, setReviews] = useState([]);

	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	let firstPageIndex = (currentPage - 1) * pageSize;
	let lastPageIndex = firstPageIndex + pageSize;
	let currentReviews = Reviews.slice(firstPageIndex, lastPageIndex);
	const token = useSelector((state) => state.userReducer.token);
	// Gets all Instructor's Review populated with Trainee's information.
	const getInstructorReviews = async () => {
		const config = {
			method: "GET",				headers: { authorization: "Bearer " + token },
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
	}, [instructorId]);

	return (
		<Container className="my-3">
			<Row>
				{/* Stats */}
				<RatingStats rating={rating} reviews={Reviews} />
				{/* Reviews */}
				<Col sm={8}>
					{Reviews.map((review) => (
						<InstructorReviewCard key={"review_" + review.trainee._id} review={review} />
					))}
				</Col>
			</Row>
		</Container>
	);
}
export default ViewInstructorReviews;
