import { Button, Row, Col } from "react-bootstrap";
import API from "../../functions/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useDispatch } from "react-redux";
import { addNotification } from "../../redux/notificationsSlice";

function CourseProgress(props) {
	const navigate = useNavigate();
	const course = props.course;
	const ownsCourse = props.ownsCourse;
	const traineeAlreadyRequestedRefund = props.traineeAlreadyRequestedRefund;

	const hisVersionOfCourse = props.hisVersionOfCourse;
	const User = useSelector((state) => state.userReducer.user);

	const userType = useSelector((state) => state.userReducer.type);

	const dispatch = useDispatch();
	function continueCourse() {
		navigate("continueCourse", {
			state: {
				course: { _id: props.course._id, title: props.course.title },
			},
		});
	}
	return (
		<>
			{!(userType === "Instructor" || userType === "Administrator") &&
				ownsCourse &&
				hisVersionOfCourse &&
				!traineeAlreadyRequestedRefund && (
					<>
						<Row className="d-flex justify-content-between align-items-center">
							<Col sm={8} className="d-flex">
								<Col sm={3} className="fitWidth me-4">
									<h5 className="fitWidth">Progress</h5>
								</Col>
								<Col sm={8} className="my-auto">
									<ProgressBar
										className="my-auto"
										variant={
											hisVersionOfCourse && hisVersionOfCourse.progress === 1 ? "success" : "info"
										}
										now={hisVersionOfCourse && hisVersionOfCourse.progress * 100}
										label={`${hisVersionOfCourse.progress * 100}%`}
									/>
								</Col>
							</Col>
							<Col sm={4} className="d-flex">
								{hisVersionOfCourse.progress === 1 && (
									<Button
										className="fitWidth ms-auto"
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
										}}>
										Get Certificate
									</Button>
								)}
								{ownsCourse && !traineeAlreadyRequestedRefund && (
									<Button
										className={`fitWidth ${hisVersionOfCourse.progress === 1 ? "ms-2" : "ms-auto"}`}
										style={{ float: "right" }}
										onClick={continueCourse}>
										Continue Course
									</Button>
								)}
							</Col>
						</Row>
						<hr />
					</>
				)}
		</>
	);
}

export default CourseProgress;
