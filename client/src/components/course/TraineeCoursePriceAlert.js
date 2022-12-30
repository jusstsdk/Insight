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

	const courseID = course._id;

	//GET USER ID AND TYPE FOR WHEN REPORTING ETC
	const user = useSelector((state) => state.userReducer.user);
	const userID = useSelector((state) => state.userReducer.user._id);
	const currency = useSelector((state) => state.userReducer.user.currency);

	async function handleTraineeBuyCourse() {
		if (
			course.price === 0 ||
			course.price <= user.wallet * user.exchangeRate
		) {
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

	return (
		<>
			{
				<Alert variant="primary" className="lead">
					Price:
					{course.discount && course.discount !== 0 && course.promotion.endDate >= new Date().toISOString() ? (
						<>
							<h1>{"" + course.price + " " + currency}</h1>
							<del>{course.originalPrice}</del>{" "}
							<span>{"" + course.promotion.discount + "% OFF"}</span>
						</>
					) : (
						<h1>{course.originalPrice + " " + currency}</h1>
					)}{" "}
					<Button variant="success" onClick={handleTraineeBuyCourse}>
						Purchase
					</Button>
				</Alert>
			}
		</>
	);
}

export default TraineeCoursePriceAlert;
