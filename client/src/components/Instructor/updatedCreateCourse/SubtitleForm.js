import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";

import { setSubtitleTitle, setSubtitleHours, addSubtitle } from "../../../redux/createCourseSlice";

import ViewVideos from "./ViewVideos";
import ViewExercises from "./ViewExercises";

export default function SubtitleForm(props) {
	const dispatch = useDispatch();
	const Title = useRef();
	const Hours = useRef();
	const SubtitleTitle = useSelector((state) => state.createCourseReducer.subtitleTitle);
	const SubtitleHours = useSelector((state) => state.createCourseReducer.subtitleHours);
	const SubtitleVideos = useSelector((state) => state.createCourseReducer.subtitleVideos);
	const SubtitleExercises = useSelector((state) => state.createCourseReducer.subtitleExercises);

	const handleAddSubtitle = () => {
		dispatch(addSubtitle());
		props.setCurrentComponent("viewSubtitles");
	};
	return (
		<>
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
						value={SubtitleTitle}
						onChange={(e) => {
							dispatch(setSubtitleTitle(e.target.value));
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
						value={SubtitleHours}
						onChange={(e) => {
							dispatch(setSubtitleHours(parseFloat(e.target.value)));
						}}
					/>
				</Col>
			</Form.Group>

			<Form.Group as={Row}>
				<ViewExercises SubtitleExercises={SubtitleExercises} delete={true} />
				<ViewVideos SubtitleVideos={SubtitleVideos} delete={true} />
			</Form.Group>
			<Col className="nextButton">
				<Button
					className="me-3"
					onClick={() => {
						props.setCurrentComponent("addExercise");
					}}>
					Add an Exercise
				</Button>

				<Button
					className="me-3"
					onClick={() => {
						props.setCurrentComponent("addVideo");
					}}>
					Add a Video
				</Button>
				<Button onClick={handleAddSubtitle}>Add Subtitle</Button>
			</Col>
		</>
	);
}
