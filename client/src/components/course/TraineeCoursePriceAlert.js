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
		
		let cost;
		if(course.promotion.endDate > new Date().toISOString() && course.promotion.discount > 0){
			cost = course.price;
		}else{
			cost = course.originalPrice;
		}
		if (cost === 0 || cost <= user.wallet * user.exchangeRate) {
			const response = await API.post(
				`/trainees/${userID}/courses/${courseID}/payment`
			);

			dispatch(payFromWallet(cost / user.exchangeRate));

			dispatch(setCourses(response.data.courses));
			dispatch(
				addNotification({
					title: "Sucesss",
					info: "You purchased the Course. You can now view all content!",
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
					{course.promotion.discount &&
					course.promotion.discount !== 0 &&
					course.promotion.endDate >= new Date().toISOString() ? (
						<>
							Price:
							<h1 style={{ display: "inline-block" }}>
								{"" +
									(course.price === 0 ? "FREE" : course.price) +
									" " +
									currency}
							</h1>
							<del>{course.originalPrice}</del>{" "}
							<span>{"" + course.promotion.discount + "% OFF"}</span>
						</>
					) : (
						<h1 style={{ display: "inline-block" }}>
							{course.originalPrice === 0
								? "FREE"
								: course.originalPrice + " " + currency}
						</h1>
					)}{" "}
					<Button
						variant="success"
						onClick={handleTraineeBuyCourse}
						style={{ float: "right" }}
					>
						{course.originalPrice === 0 ? "Claim" : "Purchase"}
					</Button>
				</Alert>
			}
		</>
	);
}

export default TraineeCoursePriceAlert;
