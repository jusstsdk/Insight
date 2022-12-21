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
	const newId = props.newId;
	const getCourseFromDB = props.getCourseFromDB;

	//report course modal
	const [showReportCourseModal, setShowReportCourseModal] = useState(false);
	const handleShowReportCourseModal = () => setShowReportCourseModal(true);

	//review course modal
	const [showReviewCourseModal, setShowReviewCourseModal] = useState(false);
	const handleShowReviewCourseModal = () => setShowReviewCourseModal(true);

	const [reviews, setReviews] = useState(course.reviews);

	return (
		<>
			<Button onClick={handleShowReviewCourseModal}>Review</Button>
			<Button variant="danger" onClick={handleShowReportCourseModal}>
				Report
			</Button>
			{reviews.map((review, index) => {
				return (
					<Card key={review.trainee} className="my-2">
						<Card.Img />
						<Card.Body key={newId()}>
							<CardGroup
								as={Row}
								className="justify-content-between align-items-center"
							>
								<Card.Title>
									<Row>
										<Col lg={8} md={6} sm={8}>
											<h4>{review.trainee}</h4>

											{new Date(review.updatedAt).toUTCString() ===
											"Invalid Date" ? (
												""
											) : (
												<h6>{new Date(review.updatedAt).toUTCString()}</h6>
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
							<hr></hr>
							<Card.Text key={newId()}>{review.review}</Card.Text>
						</Card.Body>
					</Card>
				);
			})}
			<ReportCourseModal
				course={course}
				showReportCourseModal={showReportCourseModal}
				setShowReportCourseModal={setShowReportCourseModal}
				newId={newId}
			></ReportCourseModal>
			<ReviewCourseModal
				course={course}
				showReviewCourseModal={showReviewCourseModal}
				setShowReviewCourseModal={setShowReviewCourseModal}
				newId={newId}
				reviews={reviews}
				setReviews={setReviews}
				getCourseFromDB={getCourseFromDB}
			></ReviewCourseModal>
		</>
	);
}

export default CourseReviews;
