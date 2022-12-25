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
import CourseBasicInfo from "../../components/course/CourseBasicInfo";

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
				<Container>
					<CourseTitle course={course}></CourseTitle>
					<CourseBasicInfo
						course={course}
						instructors={instructors}
						traineeOwnsCourse={traineeOwnsCourse}
						traineeVersionOfCourse={traineeVersionOfCourse}
						corpTraineeOwnsCourse={corpTraineeOwnsCourse}
						corpTraineeVersionOfCourse={corpTraineeVersionOfCourse}
					></CourseBasicInfo>
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
