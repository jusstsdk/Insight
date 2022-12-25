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
} from "react-bootstrap";
import { useRef } from "react";
import axios from "axios";
import API from "../../functions/api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import CourseTitle from "../../components/course/CourseTitle";
import CourseSubtitlesList from "../../components/course/CourseSubtitlesList";
import CourseReviews from "../../components/course/CourseReviews";
import CorpTraineeRequestCourseAlert from "./CorpTraineeCourseRequestAlert";

function TraineeCoursePriceAlert(props) {
	const navigate = useNavigate();

	const course = props.course;
	const traineeOwnsCourse = props.traineeOwnsCourse;
	const traineeVersionOfCourse = props.traineeVersionOfCourse;

	const courseID = course._id;

	//GET USER ID AND TYPE FOR WHEN REPORTING ETC
	const user = useSelector((state) => state.userReducer.user);
	const userID = useSelector((state) => state.userReducer.user._id);
	const currency = useSelector((state) => state.userReducer.user.currency);

	//Trainee Data
	const [traineeCanRefund, setTraineeCanRefund] = useState(true);
	const [traineeAlreadyRequestedRefund, setTraineeAlreadyRequestedRefund] =
		useState(false);
	const [traineePastFiftyPercentOfCourse, setTraineePastFiftyPercentOfCourse] =
		useState(false);

	const [showRefundRejectedTip, setShowRefundRejectedTip] = useState(false);

	const refundRejectedTip = useRef(null);

	const [showRefundRequest, setShowRefundRequest] = useState(false);

	const handleCloseRefundCourse = () => setShowRefundRequest(false);
	const handleShowRefundCourse = () => setShowRefundRequest(true);

	user.courses.forEach((course) => {
		if (course.course === courseID) {
			if (course.progress > 0.5) {
				setTraineeCanRefund(false);
				setTraineePastFiftyPercentOfCourse(true);
			}
			if (course.requestedRefund) {
				setTraineeCanRefund(false);
				setTraineeAlreadyRequestedRefund(true);
			}
		}
	});

	async function handleTraineeBuyCourse() {
		// navigate("payment");
	}

	async function traineeRefundCourseRequest() {
		let config = {
			method: "POST",
			url: `http://localhost:4000/api/trainees/${userID}/requestRefund/courses/${courseID}`,
		};
		setShowRefundRequest(false);
		try {
			const response = await axios(config);
			//should i check on response.status?
			setTraineeCanRefund(false);
			setTraineeAlreadyRequestedRefund(true);
		} catch (err) {
			console.log(err);
		}
	}
	const renderRefundUnavailableTooltip = () =>
		!traineeCanRefund && (
			<Tooltip id="rejectED">
				{traineeAlreadyRequestedRefund
					? "You Already Requested a Refund!"
					: "You Progressed Too Far For a Refund!"}
			</Tooltip>
		);

	return (
		<>
			{traineeOwnsCourse ? (
				<Alert variant="primary" className="lead">
					Cost{" "}
					{
						/* {trainee.courses.map((course) => {
							if (course.course === id) {
								return course.paidPrice
									? course.paidPrice
									: "MISSING DATA";
							}
						})} */
						<h1>
							{" "}
							{traineeVersionOfCourse &&
								Math.trunc(
									traineeVersionOfCourse.paidPrice * user.exchangeRate * 100
								) /
									100 +
									" " +
									currency}
						</h1>
					}
					<OverlayTrigger
						placement="right"
						delay={{ show: 250, hide: 400 }}
						overlay={traineeCanRefund ? renderRefundUnavailableTooltip : ""}
					>
						<Button
							ref={refundRejectedTip}
							variant={traineeCanRefund ? "danger" : "secondary"}
							onClick={traineeCanRefund ? handleShowRefundCourse : undefined}
							active={!traineeCanRefund}
						>
							Request Refund
						</Button>
					</OverlayTrigger>
				</Alert>
			) : (
				<Alert variant="primary" className="lead">
					Price:
					{course.discount && course.discount !== 0 ? (
						<>
							<h1>{"" + course.price + " " + currency}</h1>
							<del>{course.originalPrice}</del>{" "}
							<span>{"" + course.discount + "% OFF"}</span>
						</>
					) : (
						<h1>{course.originalPrice + " " + currency}</h1>
					)}{" "}
					<Button variant="success" onClick={handleTraineeBuyCourse}>
						Purchase
					</Button>
				</Alert>
			)}

			<Modal show={showRefundRequest} onHide={handleCloseRefundCourse}>
				<Modal.Header closeButton>
					<Modal.Title>Refund Request</Modal.Title>
				</Modal.Header>
				<Modal.Body>{":("}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseRefundCourse}>
						Cancel
					</Button>
					<Button variant="primary" onClick={traineeRefundCourseRequest}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default TraineeCoursePriceAlert;
