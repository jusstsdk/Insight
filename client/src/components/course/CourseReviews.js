import {
	Button,
	Form,
	Card,
	Badge,
	Alert,
	ListGroup,
	Tabs,
	Tab,
	Container,
	Row,
	Col,
	Table,
	Modal,
	Overlay,
	OverlayTrigger,
	Tooltip,
	CardGroup,
} from "react-bootstrap";
import { useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Rating } from "react-simple-star-rating";
import ReportCourseModal from "./ReportCourseModal";
import ReviewCourseModal from "./ReviewCourseModal";

function CourseReviews(props) {
	const course = props.course;
	const setCourse = props.setCourse;
	const getCourseFromDB = props.getCourseFromDB;
	const ownsCourse = props.ownsCourse;

	const userType = useSelector((state) => state.userReducer.type);
	const userID = useSelector((state) => state.userReducer.user._id);

	//report course modal
	const [showReportCourseModal, setShowReportCourseModal] = useState(false);
	const handleShowReportCourseModal = () => setShowReportCourseModal(true);

	//review course modal
	const [showReviewCourseModal, setShowReviewCourseModal] = useState(false);
	const handleShowReviewCourseModal = () => setShowReviewCourseModal(true);

	const [reviews, setReviews] = useState(course.reviews);

	return (
		<>
			<Row>
				<Col>
					<h3>Reviews</h3>
				</Col>
				<Col>
					{!(userType === "Instructor" || userType === "Administrator") &&
						ownsCourse && (
							<>
								<div style={{ float: "right" }}>
									<Button onClick={handleShowReviewCourseModal}>Review</Button>
									&nbsp;
									<Button
										variant="primary"
										onClick={handleShowReportCourseModal}
									>
										Report
									</Button>
								</div>
							</>
						)}
				</Col>
			</Row>

			{reviews.map((review, index) => {
				return (
					<Card key={review._id} className="my-2">
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
													? review.trainee.firstName +
													  " " +
													  review.trainee.lastName
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
				);
			})}
			<ReportCourseModal
				course={course}
				showReportCourseModal={showReportCourseModal}
				setShowReportCourseModal={setShowReportCourseModal}
			></ReportCourseModal>
			<ReviewCourseModal
				course={course}
				showReviewCourseModal={showReviewCourseModal}
				setShowReviewCourseModal={setShowReviewCourseModal}
				reviews={reviews}
				setReviews={setReviews}
				setCourse={setCourse}
				getCourseFromDB={getCourseFromDB}
			></ReviewCourseModal>
		</>
	);
}

export default CourseReviews;
