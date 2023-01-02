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
import { setCourseRefund, setCourses, setUser } from "../../redux/userSlice";
import { addNotification } from "../../redux/notificationsSlice";
import { payFromWallet } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import RatingStats from "../RatingStats";

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

	//request refund
	const dispatch = useDispatch();

	const traineeOwnsCourse = props.traineeOwnsCourse;
	const traineeVersionOfCourse = props.traineeVersionOfCourse;
	const traineeAlreadyRequestedRefund = props.traineeAlreadyRequestedRefund;
	const setTraineeAlreadyRequestedRefund =
		props.setTraineeAlreadyRequestedRefund;

	const courseID = course._id;

	const [loaded, setLoaded] = useState(false);

	//GET USER
	const user = useSelector((state) => state.userReducer.user);
	const currency = useSelector((state) => state.userReducer.user.currency);

	//Trainee Data
	const [traineeCanRefund, setTraineeCanRefund] = useState(true);
	const [traineePastFiftyPercentOfCourse, setTraineePastFiftyPercentOfCourse] =
		useState(false);

	const [showRefundRequestModal, setShowRefundRequestModal] = useState(false);

	const handleCloseRefundCourseModal = () => setShowRefundRequestModal(false);
	const handleShowRefundCourseModal = () => setShowRefundRequestModal(true);

	useEffect(() => {
		if (traineeOwnsCourse) {
			if (traineeVersionOfCourse.progress > 0.5) {
				setTraineeCanRefund(false);
				setTraineePastFiftyPercentOfCourse(true);
			}
			if (traineeVersionOfCourse.requestedRefund) {
				setTraineeCanRefund(false);
				setTraineeAlreadyRequestedRefund(true);
			}
		}

		setLoaded(true);
	});

	async function traineeRefundCourseRequest() {
		let config = {
			method: "POST",
			url: `http://localhost:4000/api/trainees/${userID}/requestRefund/courses/${courseID}`,
		};
		setShowRefundRequestModal(false);
		try {
			const response = await axios(config);
			setTraineeCanRefund(false);
			setTraineeAlreadyRequestedRefund(true);

			dispatch(setCourseRefund(courseID));

			dispatch(
				addNotification({
					title: "Refund Requested",
					info: "We've recieved your refund request. You can no longer view the course.",
					color: "error",
				})
			);
		} catch (err) {
			console.log(err);
		}
	}

	const ReviewHeader = (review) => {
		return (
			<>
				<h5 className="fitWidth">
					{review.trainee && review.trainee._id === userID
						? "You"
						: review.trainee
						? review.trainee.firstName + " " + review.trainee.lastName
						: "redacted"}
				</h5>
				{review.updatedAt ? (
					new Date(review.updatedAt).toUTCString() === "Invalid Date" ? (
						""
					) : (
						<h6 className="fitWidth text-muted ps-0 fs-6 align-self-end ">
							{new Date(review.updatedAt).toUTCString()}
						</h6>
					)
				) : new Date(review.createdAt).toUTCString() === "Invalid Date" ? (
					""
				) : (
					<h6 className="fitWidth">
						{new Date(review.createdAt).toUTCString()}
					</h6>
				)}
			</>
		);
	};

	return (
		loaded && (
			<>
				{/* Header and Buttons */}
				<Row id="courseReviews" className="mb-3">
					{/* Header */}
					<Col>
						<h3 className="fst-italic fitWidth my-auto ps-0">Reviews</h3>
					</Col>
					{/* Buttons */}
					<Col>
						<div className="d-flex justify-content-end">
							{(userType === "Trainee" || userType === "CorporateTrainee") &&
								ownsCourse && (
									<>
										{!traineeAlreadyRequestedRefund && (
											<>
												<Button
													className="ms-2"
													variant="outline-primary"
													onClick={handleShowReviewCourseModal}
												>
													Review
												</Button>
											</>
										)}
										{userType === "Trainee" &&
											!traineePastFiftyPercentOfCourse && (
												<Button
													className="ms-2"
													variant={traineeCanRefund ? "outline-warning" : "outline-secondary"}
													onClick={handleShowRefundCourseModal}
													disabled={!traineeCanRefund}
												>
													{traineeCanRefund
														? "Request Refund"
														: "Refund Request Sent"}
												</Button>
											)}
									</>
								)}
							{userType !== "Administrator" && (
								<Button
									className="ms-2"
									variant="outline-danger"
									onClick={handleShowReportCourseModal}
								>
									Report
								</Button>
							)}
						</div>
					</Col>
				</Row>
				{/* Ratings */}
				<Row>
					{/* Stats */}
					<RatingStats rating={course.rating} reviews={course.reviews} />

					{/* Reviews */}
					<Col sm={8}>
						{reviews
							.slice()
							.reverse()
							.map((review, index) => {
								return (
									<Card key={review._id} className="mb-2">
										<Card.Body>
											<CardGroup
												as={Row}
												className="justify-content-between align-items-center mb-2"
											>
												<Card.Title>
													<Row sm={10}>
														{ReviewHeader(review)}
														<Col
															className="ms-auto justify-contend-end fitWidth"
															sm={2}
														>
															<Rating
																className="fitWidth starsContainer"
																allowFraction="true"
																initialValue={review.rating}
																readonly="true"
																size={20}
															/>
														</Col>
													</Row>
												</Card.Title>
											</CardGroup>
											<Card.Text>{review.review}</Card.Text>
										</Card.Body>
									</Card>
								);
							})}
					</Col>
				</Row>
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
				<Modal
					show={showRefundRequestModal}
					onHide={handleCloseRefundCourseModal}
				>
					<Modal.Header closeButton>
						<Modal.Title>Refund</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{traineeOwnsCourse && traineeVersionOfCourse.paidPrice > 0
							? `You will be refunded ${
									traineeOwnsCourse &&
									Math.trunc(
										traineeVersionOfCourse.paidPrice *
											(user.exchangeRate ? user.exchangeRate : 1) *
											100
									) /
										100 +
										" " +
										(currency ? currency : "USD")
							  }, but will no longer have access to the course.`
							: "You will no longer have access to the course."}
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseRefundCourseModal}>
							Cancel
						</Button>
						<Button variant="primary" onClick={traineeRefundCourseRequest}>
							Confirm
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	);
}

export default CourseReviews;
