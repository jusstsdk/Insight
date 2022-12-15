import axios from "axios";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col } from "react-bootstrap";

import "../../css/createCourse.css";

import { clearInfo } from "../../redux/infoSlice";
import { clearCreateCourse } from "../../redux/createCourseSlice";

import AddInfo from "../../components/instructor/updatedCreateCourse/AddInfo";
import AddExam from "../../components/instructor/createCourse/AddExam";
import AddSubtitle from "../../components/instructor/updatedCreateCourse/AddSubtitle";

export default function CreateCourse() {
	const dispatch = useDispatch();
	const [CurrentTab, setCurrentTab] = useState("addInfo");

	const instructorId = useSelector((state) => state.userReducer.user._id);

	const ExamTitle = useSelector((state) => state.createCourseReducer.examTitle);
	const ExamQuestions = useSelector((state) => state.createCourseReducer.examQuestions);
	const Subtitles = useSelector((state) => state.createCourseReducer.subtitles);

	const InfoTitle = useSelector((state) => state.infoReducer.title);
	const InfoSummary = useSelector((state) => state.infoReducer.summary);
	const InfoOriginalPrice = useSelector((state) => state.infoReducer.originalPrice);
	const InfoPreviewVideo = useSelector((state) => state.infoReducer.previewVideo);
	const InfoSubjects = useSelector((state) => state.infoReducer.subjects);
	const InfoInstructors = useSelector((state) => state.infoReducer.instructors);

	const handleCreateCourse = async (e) => {
		e.preventDefault();
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
				instructors: instructorsIds,
				exam: { title: ExamTitle, questions: ExamQuestions },
				subtitles: Subtitles,
			},
		};
		try {
			const response = await axios(config);
			const localUser = JSON.parse(localStorage.getItem("user"));
			localUser.courses = [...localUser.courses, response.data._id];
			localStorage.setItem("user", JSON.stringify(localUser));
			dispatch(clearInfo());
			dispatch(clearCreateCourse());
		} catch (err) {
			console.log(err);
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
					<AddSubtitle setCurrentTab={setCurrentTab} handleCreateCourse={handleCreateCourse} />
				);
			default:
		}
	};
	return (
		<Form className="d-flex flex-column" id="createCourseForm">
			<Col className="d-flex justify-content-center">
				<h1>Instructor Create Course</h1>
			</Col>
			{displayView()}
		</Form>
	);
}
