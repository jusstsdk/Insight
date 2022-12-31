import axios from "axios";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Col, Breadcrumb } from "react-bootstrap";
import "../../css/createCourse.css";

import { clearInfo } from "../../redux/courseInfoSlice";
import { clearCreateCourse } from "../../redux/createCourseSlice";
import { addNotification } from "../../redux/notificationsSlice";
import { updateInstructorCourses } from "../../redux/userSlice";

import AddInfo from "../../components/instructor/createCourse/AddInfo";
import AddExam from "../../components/instructor/createCourse/AddExam";
import AddSubtitles from "../../components/instructor/createCourse/AddSubtitles";
import API from "../../functions/api";

export default function CreateCourse() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [CurrentTab, setCurrentTab] = useState("addInfo");

	const instructorId = useSelector((state) => state.userReducer.user._id);
	const user = useSelector((state) => state.userReducer.user);

	const ExamTitle = useSelector((state) => state.createCourseReducer.examTitle);
	const ExamQuestions = useSelector((state) => state.createCourseReducer.examQuestions);
	const Subtitles = useSelector((state) => state.createCourseReducer.subtitles);

	const InfoTitle = useSelector((state) => state.courseInfoReducer.title);
	const InfoSummary = useSelector((state) => state.courseInfoReducer.summary);
	const InfoOriginalPrice = useSelector((state) => state.courseInfoReducer.originalPrice);
	const InfoPreviewVideo = useSelector((state) => state.courseInfoReducer.previewVideo);
	const InfoSubjects = useSelector((state) => state.courseInfoReducer.subjects);

	const handleCreateCourse = async (status) => {
		const config = {
			method: "POST",
			url: `http://localhost:4000/api/instructors/${instructorId}/courses`,
			headers: {},
			data: {
				title: InfoTitle,
				summary: InfoSummary,
				originalPrice: (InfoOriginalPrice / user.exchangeRate).toFixed(2),
				previewVideo: InfoPreviewVideo,
				instructors: [user._id],
				subjects: InfoSubjects,
				exam: { title: ExamTitle, questions: ExamQuestions },
				subtitles: Subtitles,
				status: status,
			},
		};

		try {
			const response = await axios(config);
			dispatch(updateInstructorCourses(response.data._id));

			dispatch(clearInfo());
			dispatch(clearCreateCourse());
			dispatch(
				addNotification({
					title: "Create Course",
					info: `Course ${status === "Draft" ? "saved" : "published"} successfully`,
					color: "success",
				})
			);
			navigate("/instructor/viewInstructorCourses");
		} catch (err) {
			dispatch(
				addNotification({
					title: "Create Course",
					info: `Error while ${status === "Draft" ? "saving" : "publishing"} course!`,
					color: "error",
				})
			);
		}
	};

	const handleEditCourse = async (status) => {
		try {
			API.put(`/courses/${location.state._id}`, {
				title: InfoTitle,
				summary: InfoSummary,
				originalPrice: InfoOriginalPrice,
				previewVideo: InfoPreviewVideo,
				instructors : [instructorId],
				subjects: InfoSubjects,
				exam: { title: ExamTitle, questions: ExamQuestions },
				subtitles: Subtitles,
				status: status,
			});
			dispatch(clearInfo());
			dispatch(clearCreateCourse());
			dispatch(
				addNotification({
					title: "Create Course",
					info: `Course ${status === "Draft" ? "saved" : "published"} successfully`,
					color: "success",
				})
			);
			navigate("/instructor/viewInstructorCourses");
		} catch (err) {
			dispatch(
				addNotification({
					title: "Create Course",
					info: `Error while ${status === "Draft" ? "saving" : "publishing"} course!`,
					color: "error",
				})
			);
		}
	};
	const changeTabs = (tab) => {
		let displayError = false;

		if (CurrentTab === "addInfo") {
			if (
				InfoTitle === "" ||
				InfoSummary === "" ||
				InfoPreviewVideo === "" ||
				InfoSubjects.length === 0
			) {
				displayError = true;
			} else {
				setCurrentTab(tab);
			}
		} else if (CurrentTab === "addSubtitle") {
			if (Subtitles.length === 0 && tab === "addExam") {
				displayError = true;
			} else {
				setCurrentTab(tab);
			}
		} else if (CurrentTab === "addExam") {
			setCurrentTab(tab);
		}
		if (displayError) {
			if (CurrentTab === "addInfo") {
				dispatch(
					addNotification({
						title: "Create Course",
						info: `Please fill in all fields in the ${CurrentTab.slice(3)} tab!`,
						color: "error",
					})
				);
			} else if (CurrentTab === "addSubtitle") {
				dispatch(
					addNotification({
						title: "Create Course",
						info: `Please add at least one subtitle!`,
						color: "error",
					})
				);
			} else if (CurrentTab === "addExam") {
				dispatch(
					addNotification({
						title: "Create Course",
						info: `Make sure your exam has a title and at least one question!`,
						color: "error",
					})
				);
			}
		}
	};

	const displayView = () => {
		switch (CurrentTab) {
			case "addInfo":
				return <AddInfo setCurrentTab={setCurrentTab} />;
			case "addSubtitle":
				return <AddSubtitles setCurrentTab={setCurrentTab} />;
			case "addExam":
				return (
					<AddExam
						setCurrentTab={setCurrentTab}
						handleCreateCourse={handleCreateCourse}
						handleEditCourse={handleEditCourse}
					/>
				);
			default:
		}
	};
	return (
		<Form className="d-flex flex-column">
			<Col className="d-flex justify-content-center">
				<h1 className="fw-bold fs-2">Instructor Create Course</h1>
			</Col>
			<Col className="d-flex justify-content-center">
				{/* <Col sm={9}> */}
				<Breadcrumb>
					<Breadcrumb.Item
						className="fw-semibold"
						active={CurrentTab === "addInfo" ? true : false}
						onClick={() => {
							changeTabs("addInfo");
						}}>
						Info
					</Breadcrumb.Item>
					<Breadcrumb.Item
						className="fw-semibold"
						active={CurrentTab === "addSubtitle" ? true : false}
						onClick={() => {
							changeTabs("addSubtitle");
						}}>
						Subtitles
					</Breadcrumb.Item>
					<Breadcrumb.Item
						className="fw-semibold"
						active={CurrentTab === "addExam" ? true : false}
						onClick={() => {
							changeTabs("addExam");
						}}>
						Exam
					</Breadcrumb.Item>
				</Breadcrumb>
				{/* </Col> */}
			</Col>
			{displayView()}
		</Form>
	);
}
