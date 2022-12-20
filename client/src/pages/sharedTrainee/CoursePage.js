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

export default function CoursePage() {
	const navigate = useNavigate();
	const params = useParams();

	let courseID = params.id;

	//function to give each component a unique id. could be removed i guess.
	let uniqueId = 1;
	function newId() {
		uniqueId++;
		return uniqueId;
	}

	//GET USER ID AND TYPE FOR WHEN REPORTING ETC
	const user = useSelector((state) => state.userReducer.user);
	const userID = useSelector((state) => state.userReducer.user._id);
	const userType = useSelector((state) => state.userReducer.type);
	const currency = useSelector((state) => state.userReducer.user.currency);

	//REQUEST REFUND DATA
	const [corpTraineeOwnCourse, setCorpTraineeOwnCourse] = useState(false);
	const [corpTraineeRequestStatus, setCorpTraineeRequestStatus] = useState();

	const [traineeOwnCourse, setTraineeOwnCourse] = useState(false);
	const [traineeCanRefund, setTraineeCanRefund] = useState(true);
	const [alreadyRefunded, setAlreadyRefunded] = useState(false);

	const [refundRejectedMessage, setRefundRejectedMessage] = useState("");
	const [showRefundRejectedTip, setShowRefundRejectedTip] = useState(false);
	const refundRejectedTip = useRef(null);

	const [showRefundRequest, setShowRefundRequest] = useState(false);

	const handleCloseRefundCourse = () => setShowRefundRequest(false);
	const handleShowRefundCourse = () => setShowRefundRequest(true);

	async function refundCourse() {
		let config = {
			method: "POST",
			url: `http://localhost:4000/api/trainees/${userID}/requestRefund/courses/${courseID}`,
		};
		setShowRefundRequest(false);
		try {
			await axios(config);
			setTraineeCanRefund(false);
		} catch (err) {
			console.log(err);
		}
	}
	const renderTooltip = () => (
		<Tooltip id="rejectED">{refundRejectedMessage}</Tooltip>
	);

	//COURSE STATE
	const [course, setCourse] = useState();
	const [instructors, setInstructors] = useState();
	const [traineeCourse, setTraineeCourse] = useState();

	async function getCourseFromDB() {
		const response = await API.get(`courses/${courseID}`);

		let tempInstructors = [];
		response.data.instructors.map(async (instructor) => {
			try {
				let response = await API(`instructors/${instructor}`);

				tempInstructors = [...tempInstructors, response.data];

				setInstructors(tempInstructors);
			} catch (err) {
				console.log(err);
			}
		});

		//FIX PRICE TO
		if (response.data.price) {
			response.data.price *= user.exchangeRate;
			response.data.price = Math.trunc(response.data.price * 100) / 100;
		}
		response.data.originalPrice *= user.exchangeRate;
		response.data.originalPrice =
			Math.trunc(response.data.originalPrice * 100) / 100;
		user.courses &&
			user.courses.map((course) => {
				if (course.course === courseID) {
					setTraineeCourse(course);
					if (course.progress > 0.5) {
						setTraineeCanRefund(false);
						setRefundRejectedMessage(
							"You Can't Refund a course after getting past 50% of it!!!"
						);
					}
					if (course.requestedRefund) {
						setTraineeCanRefund(false);
						setRefundRejectedMessage("You already requested a refund!");
					}

					if (course.progress < 0.5 && !course.requestedRefund) {
						setRefundRejectedMessage("");
						setTraineeCanRefund(true);
					}
				}
			});

		setCourse(response.data);
	}

	//to handle button of request course
	const [clickable, setClickable] = useState(true);
	const [buttonText, setButtonText] = useState("");
	const [showRequestAccess, setShowRequestAccess] = useState(false);
	const [showBuyCourse, setShowBuyCourse] = useState(false);

	/////////////

	async function handleRequestAccess() {
		let config = {
			method: "POST",
			url: `http://localhost:4000/api/corporateTrainees/${userID}/request`,
			data: {
				courseId: courseID,
			},
		};
		setClickable(false);
		setButtonText("Request pending");
		try {
			let response = await axios(config);
		} catch (err) {
			console.log(err);
		}
	}
	async function handleBuyCourse() {
		navigate("payment");
	}

	//SHOW INSTRUCTORS DATA IN COURSE PAGE
	async function loadDoc() {
		await getCourseFromDB();

		if (userType === "CorporateTrainee") {
			let ShowRequestAccessTemp = true;
			setShowRequestAccess(true);
			setButtonText("Request Access");
			user.courses.some((course) => {
				if (course.course === courseID) {
					setShowRequestAccess(false);
					return true;
				}
				return false;
			});

			if (ShowRequestAccessTemp) {
				user.requests.forEach((request) => {
					if (request.courseId === courseID) {
						setClickable(false);
						setButtonText("Request pending");
					}
				});
			}
		} else {
			setShowBuyCourse(true);
			setButtonText("Buy Course");
			user.courses.some((course) => {
				if (course.course === courseID) {
					setShowBuyCourse(false);
					return true;
				}
				return false;
			});
		}
	}

	useEffect(() => {
		loadDoc();
	}, []);

	return (
		course && (
			<>
				<Container key={newId()}>
					<Row key={newId()}>
						<CourseTitle course={course}></CourseTitle>
					</Row>
					<Tabs
						key={newId()}
						defaultActiveKey="basicInfo"
						id="uncontrolled-tab-example"
						className="mb-3"
					>
						<Tab key="basicInfo" eventKey="basicInfo" title="Basic Info">
							<Row key={newId()}>
								<Col key={newId()}>
									{showBuyCourse && (
										<Alert variant="primary" className="lead" key={newId()}>
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
											<Button
												key={newId()}
												disabled={!clickable}
												variant="success"
												onClick={handleBuyCourse}
											>
												{buttonText}
											</Button>
										</Alert>
									)}
									{!showBuyCourse && (
										<Alert variant="primary" className="lead" key={newId()}>
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
													{traineeCourse &&
														Math.trunc(
															traineeCourse.paidPrice * user.exchangeRate * 100
														) /
															100 +
															" " +
															currency}
												</h1>
											}
											<OverlayTrigger
												placement="right"
												delay={{ show: 250, hide: 400 }}
												overlay={traineeCanRefund ? renderTooltip : ""}
											>
												<Button
													ref={refundRejectedTip}
													key={newId()}
													variant={traineeCanRefund ? "danger" : "secondary"}
													onClick={
														traineeCanRefund
															? handleShowRefundCourse
															: undefined
													}
													active={!traineeCanRefund}
												>
													{console.log(traineeCanRefund)}
													Request Refund
												</Button>
											</OverlayTrigger>
										</Alert>
									)}
								</Col>

								<Col>
									<Alert key={newId()} variant="dark" className="lead">
										Hours
										<h1>{course.totalHours}</h1>
										Progress
										<ProgressBar key={newId()}>
											<ProgressBar
												striped
												variant="success"
												now={traineeCourse && traineeCourse.progress}
												key={newId()}
												label={`${traineeCourse.progress * 100}%`}
											/>
										</ProgressBar>
									</Alert>
								</Col>
								{showRequestAccess && (
									<Col key={newId()}>
										<Alert key={newId()} variant="light" className="lead">
											<Button
												key={newId()}
												disabled={!clickable}
												variant="success"
												onClick={handleRequestAccess}
											>
												{buttonText}
											</Button>
										</Alert>
									</Col>
								)}
							</Row>
							<Row>
								<Col key={newId()}>
									Summary
									<h3 className="lead">{course.summary}</h3>
								</Col>
								<Col key={newId()}>
									Preview Video
									<iframe
										width="560"
										height="315"
										src={"https://www.youtube.com/embed/Nv5pIhub9wY"} //SHOULD BE {course.previewVideo} ONCE WE FIX DATABASE
										title="Preview Video"
										allowFullScreen
									/>
								</Col>
							</Row>

							<h4 className="lead">Instructors</h4>
							<ListGroup key="Group " variant="flush">
								{instructors &&
									instructors.map((instructor) => {
										return (
											<ListGroup.Item key={newId()} bg="primary">
												<Row>
													<Col>{instructor.username}</Col>
													<Col>
														<Button>View</Button>
													</Col>
												</Row>
											</ListGroup.Item> //SHOULD BE {instructor.firstName} ONCE WE FIX MODELS
										);
									})}
							</ListGroup>
						</Tab>
						<Tab key="subtititles" eventKey="subtitles" title="Subtitles">
							<CourseSubtitlesList
								course={course}
								newId={newId}
							></CourseSubtitlesList>
						</Tab>
						<Tab key="reviews" eventKey="reviews" title="Reviews">
							<CourseReviews
								course={course}
								newId={newId}
								getCourseFromDB={getCourseFromDB}
							></CourseReviews>
						</Tab>
						<Tab key="exam" eventKey="exam" title="Exam">
							<Button key={newId()}>Start Exam</Button>
						</Tab>
					</Tabs>
				</Container>

				<Modal
					key={newId()}
					show={showRefundRequest}
					onHide={handleCloseRefundCourse}
				>
					<Modal.Header key={newId()} closeButton>
						<Modal.Title key={newId()}>Refund Request</Modal.Title>
					</Modal.Header>
					<Modal.Body key={newId()}>{":("}</Modal.Body>
					<Modal.Footer key={newId()}>
						<Button
							key={newId()}
							variant="secondary"
							onClick={handleCloseRefundCourse}
						>
							Cancel
						</Button>
						<Button key={newId()} variant="primary" onClick={refundCourse}>
							Confirm
						</Button>
					</Modal.Footer>
				</Modal>

				{}
			</>
		)
	);
}