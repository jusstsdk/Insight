import { useRef, useState } from "react";
import { Form, Row, Col, Button, Tab, Tabs, Accordion } from "react-bootstrap";
import "../css/createCourse.css";
import AddExercise from "../components/instructor/AddExercise";
import AddSubtitle from "../components/instructor/AddSubtitle";
import AddInfo from "../components/instructor/AddInfo";
import ViewSubtitle from "../components/instructor/ViewSubtitle";
import TrashIcon from "../components/TrashIcon";

function CreateCourse() {
	const Title = useRef();
	const Price = useRef();
	const Summary = useRef();
	const PreviewVideo = useRef();
	const [Subjects, setSubjects] = useState([]);
	const [Instructors, setInstructors] = useState([]);

	const [Subtitles, setSubtitles] = useState([]);
	const [Exam, setExam] = useState({});
	const instructorId = localStorage.getItem("id");

	const handleCreateCourse = async (e) => {
		e.preventDefault();
		let instructorsIds = Instructors.map((instructor) => instructor._id);
		const config = {
			method: "POST",
			url: `http://localhost:4000/api/instructors/${instructorId}/courses`,
			headers: {},
			data: {
				title: Title.current.value,
				subjects: Subjects,
				summary: Summary.current.value,
				originalPrice: parseFloat(Price.current.value),
				instructors: instructorsIds,
				previewVideo: PreviewVideo.current.value,
			},
		};
		console.log(config);
		try {
			// await axios(config);
		} catch (err) {
			console.log(err);
		}
	};

	const handleDeleteSubtitle = (key) => {
		let newSubtitle = Subtitles.filter((subtitle, i) => i !== key);
		setSubtitles(newSubtitle);
	};
	return (
		<Form className="d-flex flex-column" id="createCourseForm">
			<Col className="d-flex justify-content-center">
				<h1>Instructor Create Course</h1>
			</Col>

			<Tabs defaultActiveKey="addSubtitle" id="uncontrolled-tab-example" className="mb-3" justify>
				<Tab eventKey="addInfo" title="Add Info">
					<AddInfo
						Title={Title}
						Price={Price}
						Summary={Summary}
						PreviewVideo={PreviewVideo}
						Subjects={Subjects}
						setSubjects={setSubjects}
						Instructors={Instructors}
						setInstructors={setInstructors}
					/>
				</Tab>
				<Tab eventKey="addExam" title="Add Exam">
					<AddExercise type="Exam" state={Exam} setState={setExam} />
				</Tab>
				<Tab eventKey="addSubtitle" title="Add Subtitle">
					<AddSubtitle Subtitles={Subtitles} setSubtitles={setSubtitles} />
				</Tab>
			</Tabs>
			<Accordion>
				{Subtitles.map((subtitle, subtitle_key) => {
					return (
						<Accordion.Item eventKey={`subtitle_${subtitle_key}`}>
							<div className="d-flex">
								<Accordion.Header className="accordionHeaderWidth">
									{subtitle.title}
								</Accordion.Header>
								<Button
									className="accordionTrash"
									key={subtitle_key}
									/*onClick={() => props.handleDeleteExercise(subtitle_key)}*/
								>
									<TrashIcon />
								</Button>
							</div>
							<Accordion.Body>
								<Accordion>
									<Form.Group as={Row}>
										<ViewSubtitle Exercises={subtitle.exercises} Videos={subtitle.videos} />
									</Form.Group>
								</Accordion>
							</Accordion.Body>
						</Accordion.Item>
					);
				})}
			</Accordion>

			<Col className="d-flex justify-content-center">
				<Button onClick={(e) => handleCreateCourse(e)}>Create Course</Button>
			</Col>
		</Form>
	);
}

export default CreateCourse;
