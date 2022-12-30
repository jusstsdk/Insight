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
import { useDispatch } from "react-redux";
import { addNotification } from "../../redux/notificationsSlice";

function CourseHours(props) {
	const course = props.course;
	const ownsCourse = props.ownsCourse;
	const hisVersionOfCourse = props.hisVersionOfCourse;
	const User = useSelector((state) => state.userReducer.user);

	const userType = useSelector((state) => state.userReducer.type);

	const dispatch = useDispatch();

	return (
		<>
			<Alert variant="dark" className="lead">
				Hours
				<Row>
					<Col>
						<h1 style={{ display: "inline-block" }}>{course.totalHours}</h1>
					</Col>
					<Col>
						{!(userType === "Instructor" || userType === "Administrator") &&
							ownsCourse &&
							hisVersionOfCourse &&
							hisVersionOfCourse.progress === 1 && (
								<Button
									style={{ float: "right" }}
									variant="success"
									onClick={async () => {
										dispatch(
											addNotification({
												title: "Congrats BABE",
												info: "We have sent your Certificate to you email.",
												color: "success",
											})
										);
										await API.post(`/courses/sendCertificate`, {
											courseTitle: course.title,
											email: User.email,
										});
									}}
								>
									Get Certificate
								</Button>
							)}
					</Col>
				</Row>
				{!(userType === "Instructor" || userType === "Administrator") &&
					ownsCourse &&
					"Progress"}
				{!(userType === "Instructor" || userType === "Administrator") &&
					ownsCourse &&
					hisVersionOfCourse && (
						<ProgressBar
							variant="info"
							now={hisVersionOfCourse && hisVersionOfCourse.progress * 100}
							label={`${hisVersionOfCourse.progress * 100}%`}
						/>
					)}
			</Alert>
		</>
	);
}

export default CourseHours;
