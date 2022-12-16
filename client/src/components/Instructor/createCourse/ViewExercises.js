import { useDispatch } from "react-redux";
import { Button, Accordion } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

import { removeExerciseFromSubtitle } from "../../../redux/createCourseSlice";

import ViewExercise from "./ViewExercise";
import AddExercise from "./AddExercise";
import { useState } from "react";

export default function ViewExercises(props) {
	const dispatch = useDispatch();

	const SubtitleKey = props.subtitleKey;

	const [Exercise, setExercise] = useState({});
	const [ExerciseKey, setExerciseKey] = useState(-1);
	const [ShowEditExerciseModal, setShowEditExerciseModal] = useState(false);
	const handleEditExerciseModalClose = () => setShowEditExerciseModal(false);
	const handleEditExerciseModalShow = (exercise, exercise_key) => {
		setExercise(exercise);
		setExerciseKey(exercise_key);
		setShowEditExerciseModal(true);
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
	return (
		<>
			<Accordion className="w-50">
				{props.SubtitleExercises.map((exercise, exercise_key) => {
					return (
						<Accordion.Item eventKey={`exercise_${exercise_key}`} key={`exercise_${exercise_key}`}>
							<div className="d-flex">
								<Accordion.Header className="accordionHeaderWidth">
									<h6>{exercise.title}</h6>
								</Accordion.Header>
								<Button
									className="accordionTrash"
									key={`exercise_trashButton_${exercise_key}`}
									onClick={() => handleDeleteExercise(exercise_key)}>
									<BsTrash key={"exercise_trash_" + exercise_key} className="trashIcon" />
								</Button>
								<Button
									className="accordionTrash"
									key={`exercise_trash_button_${exercise_key}`}
									onClick={() => handleEditExerciseModalShow(exercise, exercise_key)}>
									<AiOutlineEdit key={"exercise_edit_" + exercise_key} className="trashIcon" />
								</Button>
							</div>
							<Accordion.Body>
								<Accordion>
									<ViewExercise
										key={`view_exercise_questions_${exercise_key}`}
										Questions={exercise.questions}
										delete={false}
										handleDeleteQuestion={() => console.log("hi")}
									/>
								</Accordion>
							</Accordion.Body>
						</Accordion.Item>
					);
				})}
			</Accordion>
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
		</>
	);
}
