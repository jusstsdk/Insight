import axios from "axios";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Col } from "react-bootstrap";

import "../../css/createCourse.css";

import AddInfo from "../../components/instructor/updatedCreateCourse/AddInfo";
import AddExam from "../../components/instructor/updatedCreateCourse/AddExam";
import AddSubtitle from "../../components/instructor/updatedCreateCourse/AddSubtitle";

export default function CreateCourse() {
	const [CurrentTab, setCurrentTab] = useState("addInfo");

	const instructorId = useSelector((state) => state.userReducer.user._id);
	const Info = useSelector((state) => state.createCourseReducer.info);
	const ExamTitle = useSelector((state) => state.createCourseReducer.examTitle);
	const ExamQuestions = useSelector((state) => state.createCourseReducer.examQuestions);

	const Subtitles = useSelector((state) => state.createCourseReducer.subtitles);

	const handleCreateCourse = async (e) => {
		e.preventDefault();
		const config = {
			method: "POST",
			url: `http://localhost:4000/api/instructors/${instructorId}/courses`,
			headers: {},
			data: {
				...Info,
				exam: { title: ExamTitle, questions: ExamQuestions },
				subtitles: Subtitles,
			},
		};
		try {
			await axios(config);
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
