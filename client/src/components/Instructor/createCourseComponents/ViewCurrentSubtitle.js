import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col, Button, Tab, Tabs, Accordion } from "react-bootstrap";
import TrashIcon from "../../TrashIcon";
import ViewExercise from "./ViewExercise";
import { clearSubtitle } from "../../../redux/subtitleSlice";
import { clearExercise } from "../../../redux/exerciseSlice";
import { useState } from "react";
function ViewCurrentSubtitle() {
	const subtitleTitle = useSelector((state) => state.subtitleReducer.title);
	const subtitleHours = useSelector((state) => state.subtitleReducer.hours);
	const subtitleExercises = useSelector((state) => state.subtitleReducer.exercises);
	const subtitleVideos = useSelector((state) => state.subtitleReducer.videos);
	const dispatch = useDispatch();
	const exercisetitle = useSelector((state) => state.exerciseReducer.exerciseTitle);
	const exerciseQuestions = useSelector((state) => state.exerciseReducer.questions);
	const [currentSubititleDeleted, setcurrentSubititleDeleted] = useState(false);
	const handleDeleteCurerntSubtitle = () => {
		dispatch(clearSubtitle());
		dispatch(clearExercise());
		setcurrentSubititleDeleted(true);
	};
	return (
		<Accordion.Item eventKey={`subtitle_${1000}`}>
			<div className="d-flex">
				<Accordion.Header className="accordionHeaderWidth">{subtitleTitle}</Accordion.Header>
				<Button className="accordionTrash" key={1000} onClick={() => handleDeleteCurerntSubtitle()}>
					<TrashIcon />
				</Button>
			</div>
			<Accordion.Body>
				<Accordion>
					<Form.Group as={Row}>
						<Accordion
							className="w-50"
							// className={`w-50 ${
							// 	props.Exercises.length !== 0 || props.Videos.length !== 0 ? "my-3" : ""
							// }`}
						>
							{[...subtitleExercises].map((exercise, exercise_key) => {
								return (
									<Accordion.Item id="currentsub" eventKey={`exercise_${exercise_key}`}>
										<div className="d-flex">
											<Accordion.Header className="accordionHeaderWidth">
												{exercise.title}
											</Accordion.Header>
											<Button
												className="accordionTrash"
												key={exercise_key}
												// onClick={() => props.handleDeleteExercise(exercise_key)}
											>
												<TrashIcon />
											</Button>
										</div>
										<Accordion.Body>
											<Accordion>
												<ViewExercise
													key={`exercise_accordion_${exercise_key}`}
													Questions={exercise.questions}
												/>
											</Accordion>
										</Accordion.Body>
									</Accordion.Item>
								);
							})}
							{currentSubititleDeleted && (
								<Accordion.Item eventKey={`exercise_${1000}`}>
									<div className="d-flex">
										<Accordion.Header className="accordionHeaderWidth">
											{exercisetitle}
										</Accordion.Header>
										<Button
											className="accordionTrash"
											key={1000}
											// onClick={() => props.handleDeleteExercise(exercise_key)}
										>
											<TrashIcon />
										</Button>
									</div>
									<Accordion.Body>
										<Accordion>
											<ViewExercise
												key={`exercise_accordion_${1000}`}
												Questions={exerciseQuestions}
											/>
										</Accordion>
									</Accordion.Body>
								</Accordion.Item>
							)}
						</Accordion>
						{subtitleVideos.length !== 0 && (
							<Accordion
								className="w-50"
								// className={`w-50 ${
								// 	props.Exercises.length !== 0 || props.Videos.length !== 0 ? "my-3" : ""
								// }`}
							>
								{subtitleVideos.map((video, url_key) => {
									return (
										<Accordion.Item eventKey={`question_${url_key}`}>
											<div className="d-flex">
												<Accordion.Header className="accordionHeaderWidth">
													{video.url}
												</Accordion.Header>
												<Button
													className="accordionTrash"
													key={`question_trashButton_${url_key}`}
													// onClick={() => props.handleDeleteVideo(url_key)}
												>
													<TrashIcon />
												</Button>
											</div>
											<Accordion.Body>{video.description}</Accordion.Body>
										</Accordion.Item>
									);
								})}
							</Accordion>
						)}
					</Form.Group>
				</Accordion>
			</Accordion.Body>
		</Accordion.Item>
	);
}
export default ViewCurrentSubtitle;
