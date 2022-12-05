import { useRef, useState } from "react";
import { Form, Row, Col, Button, Card, Tabs, Tab, Accordion, ListGroup } from "react-bootstrap";
import "../../css/createCourse.css";
import AddExercise from "./AddExercise";
import AddVideo from "./AddVideo";
import TrashIcon from "../TrashIcon";
import ViewExercise from "./ViewExercise";
function ViewSubtitle(props) {
	return (
		<>
			<Accordion
				className={`w-50 ${
					props.Exercises.length !== 0 || props.Videos.length !== 0 ? "my-3" : ""
				}`}>
				{props.Exercises.map((exercise, exercise_key) => {
					return (
						<Accordion.Item eventKey={`exercise_${exercise_key}`}>
							<div className="d-flex">
								<Accordion.Header className="accordionHeaderWidth">
									{exercise.title}
								</Accordion.Header>
								<Button
									className="accordionTrash"
									key={exercise_key}
									onClick={() => props.handleDeleteExercise(exercise_key)}>
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
			</Accordion>
			<Accordion
				className={`w-50 ${
					props.Exercises.length !== 0 || props.Videos.length !== 0 ? "my-3" : ""
				}`}>
				{props.Videos.map((video, url_key) => {
					return (
						<Accordion.Item eventKey={`question_${url_key}`}>
							<div className="d-flex">
								<Accordion.Header className="accordionHeaderWidth">{video.url}</Accordion.Header>
								<Button
									className="accordionTrash"
									key={`question_trashButton_${url_key}`}
									onClick={() => props.handleDeleteVideo(url_key)}>
									<TrashIcon />
								</Button>
							</div>
							<Accordion.Body>{video.description}</Accordion.Body>
						</Accordion.Item>
					);
				})}
			</Accordion>{" "}
		</>
	);
}
export default ViewSubtitle;
