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
import CorpTraineeRequestCourseAlert from "../../components/course/CorpTraineeCourseRequestAlert";
import TraineeCoursePriceAlert from "../../components/course/TraineeCoursePriceAlert";

export default function CoursePage() {
	const navigate = useNavigate();
	const params = useParams();

	let courseID = params.id;
	const [loaded, setLoaded] = useState(false);

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

	//COURSE STATE
	const [course, setCourse] = useState();
	const [instructors, setInstructors] = useState();

	//trainee data
	const [traineeOwnsCourse, setTraineeOwnsCourse] = useState();
	const [traineeAlreadyRequestedRefund, setTraineeAlreadyRequestedRefund] =
		useState();
	const [traineeVersionOfCourse, setTraineeVersionOfCourse] = useState();

	//corp trainee data
	const [corpTraineeOwnsCourse, setCorpTraineeOwnsCourse] = useState();
	const [corpTraineeVersionOfCourse, setCorpTraineeVersionOfCourse] =
		useState();

	async function getCourseFromDB() {
		//get course from DB
		const response = await API.get(`courses/${courseID}`);

		//load the instructors of that course
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

		//accomodate country into price
		if (response.data.price) {
			response.data.price *= user.exchangeRate;
			response.data.price = Math.trunc(response.data.price * 100) / 100;
		}
		response.data.originalPrice *= user.exchangeRate;
		response.data.originalPrice =
			Math.trunc(response.data.originalPrice * 100) / 100;

		setCourse(response.data);
	}

	/////////////

	//SHOW INSTRUCTORS DATA IN COURSE PAGE
	async function loadData() {
		await getCourseFromDB();

		if (userType === "CorporateTrainee") {
			user.courses.forEach((course) => {
				if (course.course === courseID) {
					setCorpTraineeOwnsCourse(true);
					setCorpTraineeVersionOfCourse(course);
				}
			});
		}

		if (userType === "Trainee") {
			user.courses.forEach((course) => {
				if (course.course === courseID) {
					setTraineeOwnsCourse(true);
					setTraineeVersionOfCourse(course);
				}
			});
		}
		setLoaded(true);
	}
	useEffect(() => {
		loadData();
	}, []);

	return (
		course &&
		loaded && (
			<>
				<Container key={newId()}>
					<CourseTitle course={course}></CourseTitle>
					Basic Info
					<Row>
						{userType === "CorporateTrainee" ? (
							!corpTraineeOwnsCourse && (
								<Col>
									<CorpTraineeRequestCourseAlert
										course={course}
									></CorpTraineeRequestCourseAlert>
								</Col>
							)
						) : (
							<Col>
								<TraineeCoursePriceAlert
									course={course}
									traineeOwnsCourse={traineeOwnsCourse}
									traineeVersionOfCourse={traineeVersionOfCourse}
								></TraineeCoursePriceAlert>
							</Col>
						)}

						<Col>
							<Alert key={newId()} variant="dark" className="lead">
								Hours
								<h1>{course.totalHours}</h1>
								Progress
								{/* <ProgressBar key={newId()}>
											<ProgressBar
												striped
												variant="success"
												now={
													traineeVersionOfCourse &&
													traineeVersionOfCourse.progress
												}
												key={newId()}
												label={`${traineeVersionOfCourse.progress * 100}%`}
											/>
										</ProgressBar> */}
							</Alert>
						</Col>
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
								src={course.previewVideo} //SHOULD BE {course.previewVideo} ONCE WE FIX DATABASE
								title="Preview Video"
								allowFullScreen
							/>
						</Col>
					</Row>
					<ListGroup key="Group " variant="flush">
						Instructors
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
					<hr></hr>
					<CourseSubtitlesList
						course={course}
						newId={newId}
					></CourseSubtitlesList>
					<hr></hr>
					<CourseReviews
						course={course}
						newId={newId}
						getCourseFromDB={getCourseFromDB}
					></CourseReviews>
				</Container>
			</>
		)
	);
}
