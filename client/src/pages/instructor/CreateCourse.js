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

import AddInfo from "../../components/Instructor/createCourse/AddInfo";
import AddExam from "../../components/Instructor/createCourse/AddExam";
import AddSubtitles from "../../components/Instructor/createCourse/AddSubtitles";
import API from "../../functions/api";

export default function CreateCourse() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [CurrentTab, setCurrentTab] = useState("addInfo");

	const instructorId = useSelector((state) => state.userReducer.user._id);

	const ExamTitle = useSelector((state) => state.createCourseReducer.examTitle);
	const ExamQuestions = useSelector(
		(state) => state.createCourseReducer.examQuestions
	);
	const Subtitles = useSelector((state) => state.createCourseReducer.subtitles);

	const InfoTitle = useSelector((state) => state.courseInfoReducer.title);
	const InfoSummary = useSelector((state) => state.courseInfoReducer.summary);
	const InfoOriginalPrice = useSelector(
		(state) => state.courseInfoReducer.originalPrice
	);
	const InfoPreviewVideo = useSelector(
		(state) => state.courseInfoReducer.previewVideo
	);
	const InfoSubjects = useSelector((state) => state.courseInfoReducer.subjects);
	const InfoInstructors = useSelector(
		(state) => state.courseInfoReducer.instructors
	);

	const handleCreateCourse = async (status) => {
		let instructorsIds = InfoInstructors.map((instructor) => instructor._id);
		const config = {
			method: "POST",
			url: `http://localhost:4000/api/instructors/${instructorId}/courses`,
			headers: {},
			data: {
				title: InfoTitle,
				summary: InfoSummary,
				originalPrice: InfoOriginalPrice,
				previewVideo: InfoPreviewVideo,
				subjects: InfoSubjects,
				instructors: [instructorId, ...instructorsIds],
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
					info: `Course ${
						status === "Draft" ? "saved" : "published"
					} successfully`,
					color: "success",
				})
			);
			navigate("/instructor/viewInstructorCourses");
		} catch (err) {
			dispatch(
				addNotification({
					title: "Create Course",
					info: `Error while ${
						status === "Draft" ? "saving" : "publishing"
					} course!`,
					color: "error",
				})
			);
		}
	};

	const handleEditCourse = async (status) => {
		let instructorsIds = InfoInstructors.map((instructor) => instructor._id);
		instructorsIds = instructorsIds.filter((instructor) => {
			return instructor !== instructorId;
		});

		try {
			API.put(`/courses/${location.state._id}`, {
				title: InfoTitle,
				summary: InfoSummary,
				originalPrice: InfoOriginalPrice,
				previewVideo: InfoPreviewVideo,
				subjects: InfoSubjects,
				instructors: [instructorId, ...instructorsIds],
				exam: { title: ExamTitle, questions: ExamQuestions },
				subtitles: Subtitles,
				status: status,
			});
			dispatch(clearInfo());
			dispatch(clearCreateCourse());
			dispatch(
				addNotification({
					title: "Create Course",
					info: `Course ${
						status === "Draft" ? "saved" : "published"
					} successfully`,
					color: "success",
				})
			);
			navigate("/instructor/viewInstructorCourses");
		} catch (err) {
			dispatch(
				addNotification({
					title: "Create Course",
					info: `Error while ${
						status === "Draft" ? "saving" : "publishing"
					} course!`,
					color: "error",
				})
			);
		}
	};

	const displayView = () => {
		switch (CurrentTab) {
			case "addInfo":
				return <AddInfo setCurrentTab={setCurrentTab} />;
			case "addExam":
				return <AddExam setCurrentTab={setCurrentTab} />;
			case "addSubtitle":
				return (
					<AddSubtitles
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
			<Breadcrumb>
				<Breadcrumb.Item
					className="fw-semibold"
					active={CurrentTab === "addInfo" ? true : false}
					onClick={() => {
						setCurrentTab("addInfo");
					}}
				>
					Info
				</Breadcrumb.Item>
				<Breadcrumb.Item
					className="fw-semibold"
					active={CurrentTab === "addExam" ? true : false}
					onClick={() => {
						setCurrentTab("addExam");
					}}
				>
					Exam
				</Breadcrumb.Item>
				<Breadcrumb.Item
					className="fw-semibold"
					active={CurrentTab === "addSubtitle" ? true : false}
					onClick={() => {
						setCurrentTab("addSubtitle");
					}}
				>
					Subtitles
				</Breadcrumb.Item>
			</Breadcrumb>
			{displayView()}
		</Form>
	);
}
