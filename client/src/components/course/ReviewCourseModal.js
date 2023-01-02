import { Button, Form, Modal } from "react-bootstrap";
import { useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Rating } from "react-simple-star-rating";
import ReactStars from "react-rating-stars-component";
import { addNotification } from "../../redux/notificationsSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function ReviewCourseModal(props) {
	const course = props.course;
	const showReviewCourseModal = props.showReviewCourseModal;
	const setShowReviewCourseModal = props.setShowReviewCourseModal;
	const setReviews = props.setReviews;
	const setCourse = props.setCourse;
	const getCourseFromDB = props.getCourseFromDB;

	const dispatch = useDispatch();
	const MySwal = withReactContent(Swal);
	const courseID = course._id;

	//GET USER ID AND TYPE FOR WHEN REPORTING
	const userID = useSelector((state) => state.userReducer.user._id);
	const userType = useSelector((state) => state.userReducer.type);

	const handleCloseReviewCourseModal = () => setShowReviewCourseModal(false);

	//RATE COURSE

	//Rating of course
	let courseRating = 0;
	const handleCourseRating = (rating) => {
		courseRating = rating;
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
			setCourse(response.data);
			setReviews(response.data.reviews);
			
			MySwal.fire({
				toast: true,
				position: 'bottom-end',
				showConfirmButton: false,
				timer: 4000,
				title: <strong>Review Added</strong>,
				html: <i>Your review has been added.</i>,
				icon: "success",
				timerProgressBar: true,
				grow:'row'
			});
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<Modal show={showReviewCourseModal} onHide={handleCloseReviewCourseModal}>
				<Modal.Header closeButton>
					<Modal.Title>Rate Course</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<Rating allowFraction="true" onClick={handleCourseRating} />
						</Form.Group>
						<Form.Group className="">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								ref={rateCourseDescription}
								placeholder="Review"
								rows={3}
								style={{ height: "100px" }}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="light" onClick={handleCloseReviewCourseModal}>
						Cancel
					</Button>
					<Button variant="primary" onClick={reviewCourse}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ReviewCourseModal;
