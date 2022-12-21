import { useDispatch } from "react-redux";
import { Button, Accordion, Col, Badge } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

import {
	addQuestionToExercise,
	editQuestionOfExercise,
	removeQuestionFromExercise,
	removeExerciseFromSubtitle,
} from "../../../redux/createCourseSlice";

import ViewExercise from "./ViewExercise";
import AddExercise from "./AddExercise";
import { useState } from "react";
import AddQuestion from "./AddQuestion";

export default function ViewExercises(props) {
	const dispatch = useDispatch();

	const SubtitleKey = props.subtitleKey;

	const [Exercise, setExercise] = useState({});
	const [ExerciseKey, setExerciseKey] = useState();

	const [ShowAddExerciseModal, setShowAddExerciseModal] = useState(false);
	const handleAddExerciseModalClose = () => setShowAddExerciseModal(false);
	const handleAddExerciseModalShow = () => {
		props.setSubtitle(props.subtitle);
		props.setSubtitlekey(props.subtitle_key);
		setShowAddExerciseModal(true);
	};

	const [ShowEditExerciseModal, setShowEditExerciseModal] = useState(false);
	const handleEditExerciseModalClose = () => setShowEditExerciseModal(false);
	const handleEditExerciseModalShow = (exercise, exercise_key) => {
		setExercise(exercise);
		setExerciseKey(exercise_key);
		setShowEditExerciseModal(true);
	};

	const [ShowAddQuestionModal, setShowAddQuestionModal] = useState(false);
	const handleAddQuestionModalClose = () => setShowAddQuestionModal(false);
	const handleAddQuestionModalShow = (exercise, exercise_key) => {
		setExercise(exercise);
		setExerciseKey(exercise_key);
		setShowAddQuestionModal(true);
	};

	const handleDeleteExercise = (exercise_key) => {
		let newExercises = props.SubtitleExercises.filter((_, i) => i !== exercise_key);
		dispatch(
			removeExerciseFromSubtitle({
				subtitleKey: props.subtitleKey,
				newExercises: newExercises,
			})
		);
	};

	const handleAddQuestion = (newQuestion) => {
		dispatch(
			addQuestionToExercise({
				subtitleKey: props.subtitleKey,
				exerciseKey: ExerciseKey,
				question: newQuestion,
			})
		);
	};
	const handleEditQuestion = (exercise_key, question_key, newQuestion) => {
		dispatch(
			editQuestionOfExercise({
				subtitleKey: props.subtitleKey,
				exerciseKey: exercise_key,
				questionKey: question_key,
				question: newQuestion,
			})
		);
	};

	const handleDeleteQuestion = (question_key) => {
		let newQuestions = props.SubtitleExercises[ExerciseKey].questions.filter(
			(question, i) => i !== question_key
		);
		dispatch(
			removeQuestionFromExercise({
				subtitleKey: props.subtitleKey,
				exerciseKey: ExerciseKey,
				newQuestions: newQuestions,
			})
		);
	};
	return (
		<>
			<Accordion>
				<Accordion.Item
					eventKey={`subtitle_${props.subtitleKey}_exercises`}
					key={`subtitle_${props.subtitleKey}_exercises`}>
					<Accordion.Header className="accordionHeaderWidth">
						<h6>Exercises</h6>
						<Col className="d-flex justify-content-end me-3">
							<h6 className="my-auto d-flex align-self-center">
								<Badge bg="primary" pill>
									{props.SubtitleExercises.length}
								</Badge>
							</h6>
						</Col>
					</Accordion.Header>
					<Accordion.Body>
						<Accordion>
							{props.SubtitleExercises.map((exercise, exercise_key) => {
								return (
									<Accordion.Item
										eventKey={`exercise_${exercise_key}`}
										key={`exercise_${exercise_key}`}>
										<div className="d-flex">
											<Col sm={11} className="me-auto">
												<Accordion.Header className="accordionHeaderWidth">
													<h6>{exercise.title}</h6>
													<Col className="d-flex justify-content-end me-3">
														<Badge bg="primary" pill>
															{exercise.questions.length}
														</Badge>
													</Col>
												</Accordion.Header>
											</Col>
											<Col sm={1} className="d-flex justify-content-end">
												<Button
													variant="success"
													style={{ zIndex: 1000 }}
													className="accordionTrash accordionLikeEditButton"
													key={`exercise_edit_button_${exercise_key}`}
													onClick={() => handleEditExerciseModalShow(exercise, exercise_key)}>
													<AiOutlineEdit key={"exercise_edit_" + exercise_key} />
												</Button>
												<Button
													className="accordionTrash accordionLikeDeleteButton"
													variant="danger"
													key={`exercise_trash_button_${exercise_key}`}
													onClick={() => handleDeleteExercise(exercise_key)}>
													<BsTrash key={"exercise_trash_" + exercise_key} />
												</Button>
											</Col>
										</div>
										<Accordion.Body>
											<Accordion>
												<Col>
													<ViewExercise
														case="Exercise"
														key={`view_exercise_questions_${exercise_key}`}
														Questions={exercise.questions}
														handleAddQuestion={handleEditQuestion}
														exerciseKey={exercise_key}
														handleDeleteQuestion={handleDeleteQuestion}
													/>
												</Col>
												<Col className=" d-flex">
													<Button
														onClick={() => handleAddQuestionModalShow(exercise, exercise_key)}
														className="me-1 m-auto">
														Add Question
													</Button>
												</Col>
											</Accordion>
										</Accordion.Body>
									</Accordion.Item>
								);
							})}
						</Accordion>
						<Col className="mt-2">
							<Button
								onClick={() => handleAddExerciseModalShow(props.subtitle, props.subtitle_key)}
								className="me-3">
								Add Exercise
							</Button>
						</Col>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>

			{ShowAddExerciseModal && (
				<AddExercise
					case="Add"
					subtitle={props.subtitle}
					subtitleKey={props.subtitleKey}
					show={ShowAddExerciseModal}
					handleClose={handleAddExerciseModalClose}
				/>
			)}
			{ShowEditExerciseModal && (
				<AddExercise
					case="Edit"
					exercise={Exercise}
					exerciseKey={ExerciseKey}
					subtitleKey={SubtitleKey}
					show={ShowEditExerciseModal}
					handleClose={handleEditExerciseModalClose}
				/>
			)}
			{ShowAddQuestionModal && (
				<AddQuestion
					case="Add"
					exercise={Exercise}
					exerciseKey={ExerciseKey}
					subtitleKey={SubtitleKey}
					show={ShowAddQuestionModal}
					handleClose={handleAddQuestionModalClose}
					handleAddQuestion={handleAddQuestion}
				/>
			)}
		</>
	);
}
