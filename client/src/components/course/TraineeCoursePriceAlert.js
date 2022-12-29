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
import { setCourses } from "../../redux/userSlice";
import { addNotification } from "../../redux/notificationsSlice";
import { payFromWallet } from "../../redux/userSlice";

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
		if (course.price === 0 || course.price <= user.wallet * user.exchangeRate) {
			const response = await API.post(
				`/trainees/${userID}/courses/${courseID}/payment`
			);

			if (course.price <= user.wallet * user.exchangeRate) {
				dispatch(payFromWallet(course.price / user.exchangeRate));
			}
			dispatch(setCourses(response.data.courses));
			dispatch(
				addNotification({
					title: "purchase successful",
					info: "course successfully purchased,you can now access all the content!",
					color: "success",
				})
			);
			navigate("/");
		} else {
			navigate("payment");
		}
	}

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

			console.log(response.data.courses);
			dispatch(setCourses(response.data.courses));
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

	return (
		loaded && (
			<>
				{traineeOwnsCourse ? (
					<Alert variant="primary" className="lead">
						Cost <br />
						{
							/* {trainee.courses.map((course) => {
							if (course.course === id) {
								return course.paidPrice
									? course.paidPrice
									: "MISSING DATA";
							}
						})} */
							<Row>
								<Col>
									<h1 style={{ display: "inline-block" }}>
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
								</Col>
								<Col>
									{!traineePastFiftyPercentOfCourse && (
										<Button
											style={{ float: "right" }}
											variant={traineeCanRefund ? "primary" : "secondary"}
											onClick={handleShowRefundCourseModal}
											disabled={!traineeCanRefund}
										>
											{traineeCanRefund
												? "Request Refund"
												: "Refund Request Sent"}
										</Button>
									)}
								</Col>
							</Row>
						}
					</Alert>
				) : (
					<Alert variant="dark" className="lead">
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
						<Button variant="primary" onClick={handleTraineeBuyCourse}>
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
