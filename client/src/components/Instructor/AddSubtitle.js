import { useRef, useState } from "react";
import { Form, Row, Col, Button, Card, Tabs, Tab, Accordion, ListGroup } from "react-bootstrap";
import "../../css/createCourse.css";
import AddExercise from "./AddExercise";
import AddVideo from "./AddVideo";
import TrashIcon from "../TrashIcon";
import ViewExercise from "./ViewExercise";
import ViewSubtitle from "./ViewSubtitle";
import { useDispatch } from "react-redux";
import { setTitle, setHours, clearSubtitle } from "../../redux/subtitleSlice";
function AddSubtitle(props) {
	const dispatch = useDispatch();
	const Title = useRef();
	const Hours = useRef();
	const [Exercises, setExercises] = useState([]);
	const [Videos, setVideos] = useState([]);

	const handleAddSubtitle = () => {
		let newSubtitle = {
			title: Title.current.value,
			hours: parseFloat(Hours.current.value),
			exercises: Exercises,
			videos: Videos,
		};
		props.setSubtitles((subtitles) => [...subtitles, newSubtitle]);
		dispatch(clearSubtitle());
		Title.current.value = "";
		Hours.current.value = "";
		setExercises([]);
		setVideos([]);
	};

	const handleDeleteExercise = (key) => {
		let newExercises = Exercises.filter((exercise, i) => i !== key);
		setExercises(newExercises);
	};
	const handleDeleteVideo = (key) => {
		let newVideos = Videos.filter((video, i) => i !== key);
		setVideos(newVideos);
	};

	return (
		<Card className="container-fluid">
			<Form.Group
				as={Row}
				className="mb-3 d-flex align-items-center justify-content-start"
				controlId="formHorizontalEmail">
				<Form.Label column sm={2}>
					Subtitle Title
				</Form.Label>
				<Col sm={3}>
					<Form.Control
						type="text"
						placeholder="Title"
						ref={Title}
						onChange={(e) => {
							dispatch(setTitle(e.target.value));
						}}
					/>
				</Col>

				<Form.Label id="hours" column sm={1}>
					Hours
				</Form.Label>
				<Col sm={2}>
					<Form.Control
						type="number"
						placeholder="Hours"
						ref={Hours}
						onChange={(e) => {
							dispatch(setHours(e.target.value));
						}}
					/>
				</Col>
				<Col sm={2}>
					<Button id="addSubject" onClick={handleAddSubtitle}>
						Add Subtitle
					</Button>
				</Col>
			</Form.Group>
			<Tabs defaultActiveKey="addExercise" id="uncontrolled-tab-example" className="mb-3" justify>
				<Tab eventKey="addExercise" title="Add Exercise">
					<Card className="container-fluid">
						<AddExercise type="Exercise" state={Exercises} setState={setExercises} />
					</Card>
				</Tab>
				<Tab eventKey="addVideo" title="Add Video">
					<AddVideo Videos={Videos} setVideos={setVideos} />
				</Tab>
			</Tabs>
			<Form.Group as={Row} className="d-flex">
				<Col sm={6} className="d-flex justify-content-center">
					{Exercises.length !== 0 && <Form.Label>Subtitle Exercises</Form.Label>}
				</Col>
				<Col sm={6} className="d-flex justify-content-center">
					{Videos.length !== 0 && <Form.Label>Subtitle Videos</Form.Label>}
				</Col>
			</Form.Group>
			<Form.Group as={Row}>
				<ViewSubtitle
					Exercises={Exercises}
					Videos={Videos}
					handleDeleteVideo={handleDeleteVideo}
					handleDeleteExercise={handleDeleteExercise}
				/>
			</Form.Group>
		</Card>
	);
}

export default AddSubtitle;
