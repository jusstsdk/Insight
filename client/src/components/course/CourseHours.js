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

function CourseHours(props) {
	const course = props.course;
	const ownsCourse = props.ownsCourse;
	const hisVersionOfCourse = props.hisVersionOfCourse;

	return (
		<>
			<Alert variant="dark" className="lead">
				Hours
				<h1>{course.totalHours}</h1>
				{ownsCourse && "Progress"}
				{ownsCourse && hisVersionOfCourse && (
					<ProgressBar>
						<ProgressBar
							variant="info"
							now={hisVersionOfCourse && hisVersionOfCourse.progress * 100}
							label={`${hisVersionOfCourse.progress * 100}%`}
						/>
					</ProgressBar>
				)}
			</Alert>
		</>
	);
}

export default CourseHours;
