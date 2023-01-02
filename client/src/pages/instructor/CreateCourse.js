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
import subjects from "../../functions/subjects";
import { MdOutlineError } from "react-icons/md";

export default function CreateCourse() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [CurrentTab, setCurrentTab] = useState("addInfo");

	const instructorId = useSelector((state) => state.userReducer.user._id);
	const user = useSelector((state) => state.userReducer.user);

	const ExamTitle = useSelector(
		(state) => state.createCourseReducer.examTitle
	);
	const ExamQuestions = useSelector(
		(state) => state.createCourseReducer.examQuestions
	);
	const Subtitles = useSelector(
		(state) => state.createCourseReducer.subtitles
	);

	const InfoTitle = useSelector((state) => state.courseInfoReducer.title);
	const InfoSummary = useSelector((state) => state.courseInfoReducer.summary);

	const InfoOriginalPrice = useSelector(
		(state) => state.courseInfoReducer.originalPrice
	);
	const InfoPreviewVideo = useSelector(
		(state) => state.courseInfoReducer.previewVideo
	);
	const [BadPreviewUrl, setBadPreviewUrl] = useState(false);

	const InfoSubjects = useSelector(
		(state) => state.courseInfoReducer.subjects
	);
	//breadcrumb errors
	const [displayErrors, setDisplayErrors] = useState(false);
	const [InfoHasErrors, setInfoHasErrors] = useState(false);
	const [ExamHasErrors, setExamHasErrors] = useState(false);
	const [SubtitleHasErrors, setSubtitleHasErrors] = useState(false);
	//addInfo errors
	const [MissingCourseTitle, setMissingCourseTitle] = useState(false);
	const [InvalidPrice, setInvalidPrice] = useState(false);
	const [MissingSummary, setMissingSummary] = useState(false);
	const [MissingPreviewVideo, setMissingPreviewVideo] = useState(false);
	const [MissingSubjects, setMissingSubjects] = useState(false);
	//addSubtitles errors
	const [NoSubtitles, setNoSubtitles] = useState(false);
	const [MissingVideos, setMissingVideos] = useState(false);
	const [ExcersisesMissingQuestions, setExcersisesMissingQuestions] =
		useState(false);
	//addExam errors
	const [MissingExamTitle, setMissingExamTitle] = useState(false);
	const [NoExamQuestions, setNoExamQuestions] = useState(false);
	const validatePublish = (status) => {
		setDisplayErrors(false);
		let infoHadErrors = false;
		let subtitleHadErrors = false;
		let examHadErrors = false;
		if (status === "Published") {
			if (
				InfoTitle === "" ||
				InfoSummary === "" ||
				InfoOriginalPrice === "" ||
				InfoPreviewVideo === "" ||
				BadPreviewUrl ||
				InfoSubjects.length === 0
			) {
				setDisplayErrors(true);
				setInfoHasErrors(true);
				infoHadErrors = true;
			} else {
				setInfoHasErrors(false);
			}

			if (
				Subtitles.length === 0 ||
				Subtitles.some((subtitle) => subtitle.videos.length === 0) ||
				Subtitles.some((subtitle) =>
					subtitle.exercises.some(
						(exercise) => exercise.questions.length === 0
					)
				)
			) {
				setDisplayErrors(true);
				setSubtitleHasErrors(true);
				subtitleHadErrors = true;
			} else {
				setSubtitleHasErrors(false);
			}
			if (ExamTitle === "" || ExamQuestions.length === 0) {
				setDisplayErrors(true);
				setExamHasErrors(true);
				examHadErrors = true;
			} else {
				setExamHasErrors(false);
			}

			if (infoHadErrors || subtitleHadErrors || examHadErrors) {
				if (infoHadErrors) {
					dispatch(
						addNotification({
							title: "Info tab error",
							info: "Please fill out all the fields in the info tab with valid data",
							color: "error",
						})
					);
				}
				if (subtitleHadErrors) {
					dispatch(
						addNotification({
							title: "Subtitles tab error",
							info: "Make sure you have at least one subtitle and that each subtitle has at least one video and that each exercise has at least one question",
							color: "error",
						})
					);
				}
				if (examHadErrors) {
					dispatch(
						addNotification({
							title: "Exam tab error",
							info: "Make sure you have an exam title and at least one question",
							color: "error",
						})
					);
				}
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}
	};

	const handleCreateCourse = async (status) => {
		let valid = validatePublish(status);
		if (!valid) {
			return;
		}
		const config = {
			method: "POST",
			url: `http://localhost:4000/api/instructors/${instructorId}/courses`,
			headers: {},
			data: {
				title: InfoTitle,
				summary: InfoSummary,
				originalPrice: (InfoOriginalPrice / user.exchangeRate).toFixed(
					2
				),
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
		try {
			let valid = validatePublish(status);
			if (!valid) {
				return;
			}

			API.put(`/courses/${location.state._id}`, {
				title: InfoTitle,
				summary: InfoSummary,
				originalPrice: InfoOriginalPrice,
				previewVideo: InfoPreviewVideo,
				instructors: [instructorId],
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
				return (
					<AddInfo
						setCurrentTab={setCurrentTab}
						MissingCourseTitle={MissingCourseTitle}
						setMissingCourseTitle={setMissingCourseTitle}
						MissingSummary={MissingSummary}
						setMissingSummary={setMissingSummary}
						MissingSubjects={MissingSubjects}
						setMissingSubjects={setMissingSubjects}
						InvalidPrice={InvalidPrice}
						setInvalidPrice={setInvalidPrice}
						MissingPreviewVideo={MissingPreviewVideo}
						setMissingPreviewVideo={setMissingPreviewVideo}
						BadPreviewUrl={BadPreviewUrl}
						setBadPreviewUrl={setBadPreviewUrl}
						displayErrors={displayErrors}
					/>
				);
			case "addSubtitle":
				return (
					<AddSubtitles
						setCurrentTab={setCurrentTab}
						NoSubtitles={NoSubtitles}
						setNoSubtitles={setNoSubtitles}
						MissingVideos={MissingVideos}
						setMissingVideos={setMissingVideos}
						ExcersisesMissingQuestions={ExcersisesMissingQuestions}
						setExcersisesMissingQuestions={
							setExcersisesMissingQuestions
						}
						displayErrors={displayErrors}
					/>
				);
			case "addExam":
				return (
					<AddExam
						setCurrentTab={setCurrentTab}
						MissingExamTitle={MissingExamTitle}
						setMissingExamTitle={setMissingExamTitle}
						NoExamQuestions={NoExamQuestions}
						setNoExamQuestions={setNoExamQuestions}
						handleCreateCourse={handleCreateCourse}
						handleEditCourse={handleEditCourse}
						displayErrors={displayErrors}
					/>
				);
			default:
		}
	};
	return (
		<Form className="d-flex flex-column">
			<Col className="d-flex justify-content-center">
				<h1 className="fw-bold fs-2">Create Course</h1>
			</Col>
			<Col className="d-flex justify-content-center">
				{/* <Col sm={9}> */}
				<Breadcrumb>
					<Breadcrumb.Item
						className="fw-semibold"
						active={CurrentTab === "addInfo" ? true : false}
					>
						Info {InfoHasErrors && <MdOutlineError color="red" />}
					</Breadcrumb.Item>
					<Breadcrumb.Item
						className="fw-semibold"
						active={CurrentTab === "addSubtitle" ? true : false}
					>
						Subtitles{" "}
						{SubtitleHasErrors && <MdOutlineError color="red" />}
					</Breadcrumb.Item>
					<Breadcrumb.Item
						className="fw-semibold"
						active={CurrentTab === "addExam" ? true : false}
					>
						Exam {ExamHasErrors && <MdOutlineError color="red" />}
					</Breadcrumb.Item>
				</Breadcrumb>
				{/* </Col> */}
			</Col>
			{displayView()}
		</Form>
	);
}
