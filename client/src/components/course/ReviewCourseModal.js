import { Button, Form, Modal } from "react-bootstrap";
import { useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Rating } from "react-simple-star-rating";
import ReactStars from "react-rating-stars-component";

function ReviewCourseModal(props) {
	const course = props.course;
	const showReviewCourseModal = props.showReviewCourseModal;
	const setShowReviewCourseModal = props.setShowReviewCourseModal;
	const newId = props.newId;
	const reviews = props.reviews;
	const setReviews = props.setReviews;
	const getCourseFromDB = props.getCourseFromDB;

	const courseID = course._id;

	//GET USER ID AND TYPE FOR WHEN REPORTING
	const userID = useSelector((state) => state.userReducer.user._id);
	const userType = useSelector((state) => state.userReducer.type);

	const handleCloseReviewCourseModal = () => setShowReviewCourseModal(false);

	//RATE COURSE

	//Rating of course
	const [courseRating, setCourseRating] = useState(0);
	const handleCourseRating = (rating) => {
		setCourseRating(rating);
	};

	const rateCourseDescription = useRef();

	async function reviewCourse() {
		let config = {
			method: "POST",
			url: `http://localhost:4000/api/courses/${courseID}/review`,
			data: {
				rating: courseRating,
				review: rateCourseDescription.current.value,
				trainee: userID,
				traineeType: userType,
			},
		};
		handleCloseReviewCourseModal();
		try {
			const response = await axios(config);
			setReviews(response.data.reviews);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<Modal
				key={newId()}
				show={showReviewCourseModal}
				onHide={handleCloseReviewCourseModal}
			>
				<Modal.Header key={newId()} closeButton>
					<Modal.Title key={newId()}>Rate Course</Modal.Title>
				</Modal.Header>
				<Modal.Body key={newId()}>
					<Form key={newId()}>
						<Form.Group key={newId()} className="mb-3" controlId="rateCourse">
							<Rating
								allowFraction="true"
								onClick={handleCourseRating}
								/* Available Props */
							/>
						</Form.Group>
						<Form.Group
							key={newId()}
							className="mb-3"
							controlId="ratingDescription"
						>
							<Form.Label key={newId()}>Description</Form.Label>
							<Form.Control
								as="textarea"
								key={newId()}
								ref={rateCourseDescription}
								placeholder="Review"
								rows={3}
								style={{ height: "100px" }}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer key={newId()}>
					<Button
						key={newId()}
						variant="secondary"
						onClick={handleCloseReviewCourseModal}
					>
						Cancel
					</Button>
					<Button key={newId()} variant="primary" onClick={reviewCourse}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ReviewCourseModal;
