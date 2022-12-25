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
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { addNotification } from "../../redux/notificationsSlice";

function TraineeCoursePriceAlert(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const course = props.course;
	const traineeOwnsCourse = props.traineeOwnsCourse;
	const traineeVersionOfCourse = props.traineeVersionOfCourse;

	const courseID = course._id;

	const [loaded, setLoaded] = useState(false);

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

	async function handleTraineeBuyCourse() {
		// navigate("payment");
		alert("Mad?");
	}

	async function traineeRefundCourseRequest() {
		let config = {
			method: "POST",
			url: `http://localhost:4000/api/trainees/${userID}/requestRefund/courses/${courseID}`,
		};
		setShowRefundRequestModal(false);
		try {
			const response = await axios(config);
			// setTraineeCanRefund(false);
			// setTraineeAlreadyRequestedRefund(true);

			console.log(user);
			console.log(response.data);
			dispatch(setUser(response.data));
			dispatch(
				addNotification({
					title: "Refund Requested",
					info: "We've recieved your refund request. You can no longer view the course.",
					color: "success",
				})
			);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		loaded && (
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
										traineeVersionOfCourse.paidPrice *
											(user.exchangeRate ? user.exchangeRate : 1) *
											100
									) /
										100 +
										" " +
										(currency ? currency : "USD")}
							</h1>
						}
						{!traineePastFiftyPercentOfCourse && (
							<Button
								variant={traineeCanRefund ? "danger" : "secondary"}
								onClick={handleShowRefundCourseModal}
								disabled={!traineeCanRefund}
							>
								{traineeCanRefund ? "Request Refund" : "Refund Request Sent"}
							</Button>
						)}
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

				<Modal
					show={showRefundRequestModal}
					onHide={handleCloseRefundCourseModal}
				>
					<Modal.Header closeButton>
						<Modal.Title>Request a Refund?</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{"You will no longer have access to the course."}
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

export default TraineeCoursePriceAlert;
