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
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Rating } from "react-simple-star-rating";
import CorpTraineeRequestCourseAlert from "../../components/course/CorpTraineeCourseRequestAlert";
import TraineeCoursePriceAlert from "../../components/course/TraineeCoursePriceAlert";
import CourseHours from "../../components/course/CourseHours";
import CourseSummaryPrevVid from "../../components/course/CourseSummaryPrevVid";
import CourseInstructorsList from "../../components/course/CourseInstructorsList";
import InstructorPriceAlert from "./InstructorPriceAlert";

function CourseBasicInfo(props) {
	const course = props.course;
	const instructors = props.instructors;

	const traineeOwnsCourse = props.traineeOwnsCourse;
	const traineeVersionOfCourse = props.traineeVersionOfCourse;
	const traineeAlreadyRequestedRefund = props.traineeAlreadyRequestedRefund;

	const corpTraineeOwnsCourse = props.corpTraineeOwnsCourse;
	const corpTraineeVersionOfCourse = props.corpTraineeVersionOfCourse;

	const userType = useSelector((state) => state.userReducer.type);

	return (
		<>
			{userType === "CorporateTrainee" ? (
				!corpTraineeOwnsCourse && (
					<Col>
						<CorpTraineeRequestCourseAlert
							course={course}
						></CorpTraineeRequestCourseAlert>
					</Col>
				)
			) : userType === "Trainee" ? (
				!traineeOwnsCourse && (
					<Col>
						<TraineeCoursePriceAlert
							course={course}
							traineeOwnsCourse={traineeOwnsCourse}
							traineeVersionOfCourse={traineeVersionOfCourse}
						></TraineeCoursePriceAlert>
					</Col>
				)
			) : (
				<Col>
					<InstructorPriceAlert course={course}></InstructorPriceAlert>
				</Col>
			)}

			<CourseHours
				course={course}
				ownsCourse={
					userType === "Trainee" ? traineeOwnsCourse : corpTraineeOwnsCourse
				}
				hisVersionOfCourse={
					userType === "Trainee"
						? traineeVersionOfCourse
						: corpTraineeVersionOfCourse
				}
				traineeAlreadyRequestedRefund={traineeAlreadyRequestedRefund}
			></CourseHours>
			<h3>Basic Info</h3>
			<Row>
				<CourseSummaryPrevVid course={course}></CourseSummaryPrevVid>
			</Row>
			<hr />
			<CourseInstructorsList instructors={instructors}></CourseInstructorsList>
		</>
	);
}

export default CourseBasicInfo;
