import { Container } from "react-bootstrap";
import { useRef } from "react";
import axios from "axios";
import API from "../../functions/api";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseTitle from "../../components/course/CourseTitle";
import CourseSubtitlesList from "../../components/course/CourseSubtitlesList";
import CourseReviews from "../../components/course/CourseReviews";
import CourseBasicInfo from "../../components/course/CourseBasicInfo";
import { setCourses, payFromWallet } from "../../redux/userSlice";
import { addNotification } from "../../redux/notificationsSlice";

export default function CoursePage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const params = useParams();

	let courseID = params.id;
	const [loaded, setLoaded] = useState(false);

	//GET USER ID AND TYPE FOR WHEN REPORTING ETC
	const user = useSelector((state) => state.userReducer.user);
	const userType = useSelector((state) => state.userReducer.type);

	//COURSE STATE
	const [course, setCourse] = useState();
	const [instructors, setInstructors] = useState();

	//trainee data
	const [traineeOwnsCourse, setTraineeOwnsCourse] = useState(false);
	const [traineeVersionOfCourse, setTraineeVersionOfCourse] = useState();
	const [traineeAlreadyRequestedRefund, setTraineeAlreadyRequestedRefund] =
		useState(false);

	//corp trainee data
	const [corpTraineeOwnsCourse, setCorpTraineeOwnsCourse] = useState(false);
	const [corpTraineeVersionOfCourse, setCorpTraineeVersionOfCourse] =
		useState();

	//instructor data
	const [instructorTeachesCourse, setInstrcutorTeachesCourse] = useState(false);

	async function getCourseFromDB() {
		//get course from DB
		const response = await API.get(`courses/${courseID}/fullCourse`);

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
			response.data.price *= user.exchangeRate ? user.exchangeRate : 1;
			response.data.price = Math.trunc(response.data.price * 100) / 100;
		}
		response.data.originalPrice *= user.exchangeRate ? user.exchangeRate : 1;
		response.data.originalPrice =
			Math.trunc(response.data.originalPrice * 100) / 100;

		await setCourse(response.data);
		return true;
	}

	/////////////

	//SHOW INSTRUCTORS DATA IN COURSE PAGE
	async function loadData() {
		await getCourseFromDB();

		if (userType === "CorporateTrainee") {
			user.courses.forEach((userCourse) => {
				if (userCourse.course === courseID) {
					setCorpTraineeOwnsCourse(true);
					setCorpTraineeVersionOfCourse(userCourse);
				}
			});
		}

		if (userType === "Trainee") {
			user.courses.forEach((userCourse) => {
				if (userCourse.course === courseID) {
					setTraineeOwnsCourse(true);
					setTraineeVersionOfCourse(userCourse);
					if (userCourse.requestedRefund) {
						setTraineeAlreadyRequestedRefund(true);
					}
				}
			});
		}

		if (userType === "Administrator") {
		}

		if (userType === "Instructor") {
			user.courses.forEach((course) => {
				if (course.course === courseID) {
					setInstrcutorTeachesCourse(true);
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
			<Container>
				<CourseTitle
					course={course}
					id="title"
					ownsCourse={
						userType === "Trainee"
							? traineeOwnsCourse
							: userType === "CorporateTrainee"
							? corpTraineeOwnsCourse
							: instructorTeachesCourse
					}
					traineeAlreadyRequestedRefund={traineeAlreadyRequestedRefund}
				></CourseTitle>
				<hr />
				<CourseBasicInfo
					course={course}
					instructors={instructors}
					traineeOwnsCourse={traineeOwnsCourse}
					traineeVersionOfCourse={traineeVersionOfCourse}
					traineeAlreadyRequestedRefund={traineeAlreadyRequestedRefund}
					corpTraineeOwnsCourse={corpTraineeOwnsCourse}
					corpTraineeVersionOfCourse={corpTraineeVersionOfCourse}
					id="basicInfo"
				></CourseBasicInfo>
				<hr />
				<CourseSubtitlesList
					course={course}
					id="subtitles"
				></CourseSubtitlesList>
				<hr />
				<CourseReviews
					course={course}
					setCourse={setCourse}
					getCourseFromDB={getCourseFromDB}
					ownsCourse={
						userType === "Trainee" ? traineeOwnsCourse : corpTraineeOwnsCourse
					}
					id="reviews"
					traineeOwnsCourse={traineeOwnsCourse}
					traineeVersionOfCourse={traineeVersionOfCourse}
					traineeAlreadyRequestedRefund={traineeAlreadyRequestedRefund}
					setTraineeAlreadyRequestedRefund={setTraineeAlreadyRequestedRefund}
				></CourseReviews>
			</Container>
		)
	);
}
