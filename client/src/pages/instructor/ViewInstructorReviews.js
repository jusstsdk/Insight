import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import InstructorReviewCard from "../../components/instructor/InstructorReviewCard";
import Pagination from "../../components/shared/pagination/Pagination";
import "../../components/shared/pagination/style.scss";

let pageSize = 2;
function ViewInstructorReviews() {
	const instructorId = useSelector((state) => state.userReducer.user._id);
	const [Reviews, setReviews] = useState([]);

	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	let firstPageIndex = (currentPage - 1) * pageSize;
	let lastPageIndex = firstPageIndex + pageSize;
	let currentReviews = Reviews.slice(firstPageIndex, lastPageIndex);

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
	}, [instructorId]);

	return (
		<Container className="my-3">
			<Col lg={8} className="d-flex flex-column justify-content-center m-auto">
				{Reviews.map((review) => (
					<InstructorReviewCard
						key={"bebo" + review.trainee.username}
						review={review}
					/>
				))}
			</Col>
			{/* <Pagination
				className="pagination-bar"
				currentPage={currentPage}
				totalCount={Reviews.length}
				pageSize={pageSize}
				onPageChange={(page) => setCurrentPage(page)}
			/> */}
		</Container>
	);
}
export default ViewInstructorReviews;
