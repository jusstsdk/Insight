import { useDispatch } from "react-redux";
import { Button, Accordion } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";

import { removeExerciseFromSubtitleExercises } from "../../../redux/createCourseSlice";

import ViewExercise from "./ViewExercise";

export default function ViewExercises(props) {
	const dispatch = useDispatch();
	return (
		<>
			<Accordion className="w-50">
				{props.SubtitleExercises.map((exercise, exercise_key) => {
					return (
						<Accordion.Item eventKey={`exercise_${exercise_key}`} key={`exercise_${exercise_key}`}>
							<div className="d-flex">
								<Accordion.Header className="accordionHeaderWidth">
									{exercise.title}
								</Accordion.Header>
								{props.delete && (
									<Button
										className="accordionTrash"
										key={`exercise_trashButton_${exercise_key}`}
										onClick={() => dispatch(removeExerciseFromSubtitleExercises(exercise_key))}>
										<BsTrash key={"exercise_trash_" + exercise_key} className="trashIcon" />
									</Button>
								)}
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
		</>
	);
}
