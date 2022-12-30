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
import CourseTitle from "./CourseTitle";
import CourseSubtitlesList from "./CourseSubtitlesList";
import CourseReviews from "./CourseReviews";
import CorpTraineeRequestCourseAlert from "./CorpTraineeCourseRequestAlert";
import TraineeCoursePriceAlert from "./TraineeCoursePriceAlert";
import { useDispatch } from "react-redux";
import { addNotification } from "../../redux/notificationsSlice";

function CourseProgress(props) {
	const course = props.course;
	const ownsCourse = props.ownsCourse;
	const traineeAlreadyRequestedRefund = props.traineeAlreadyRequestedRefund;

	const hisVersionOfCourse = props.hisVersionOfCourse;
	const User = useSelector((state) => state.userReducer.user);

	const userType = useSelector((state) => state.userReducer.type);

	const dispatch = useDispatch();

	return (
		<>
			{!(userType === "Instructor" || userType === "Administrator") &&
				ownsCourse &&
				hisVersionOfCourse &&
				!traineeAlreadyRequestedRefund && (
					<>
						<Row>
							<Col>
								<h5>Progress</h5>
								<ProgressBar
									variant={
										hisVersionOfCourse && hisVersionOfCourse.progress === 1
											? "success"
											: "info"
									}
									now={hisVersionOfCourse && hisVersionOfCourse.progress * 100}
									label={`${hisVersionOfCourse.progress * 100}%`}
								/>
							</Col>

							{hisVersionOfCourse.progress === 1 && (
								<>
									<Col md="auto">
										<Button
											style={{ float: "right" }}
											variant="warning"
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
									</Col>
								</>
							)}
						</Row>
						<hr />
					</>
				)}
		</>
	);
}

export default CourseProgress;
