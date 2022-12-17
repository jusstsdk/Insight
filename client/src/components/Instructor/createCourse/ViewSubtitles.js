import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Button, Accordion, ButtonGroup, Col } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { removeSubtitle } from "../../../redux/createCourseSlice";
import { useState } from "react";
import AddSubtitleInfo from "./AddSubtitleInfo";
import AddVideo from "./AddVideo";

import ViewVideos from "./ViewVideos";
import AddExercise from "./AddExercise";
import ViewExercises from "./ViewExercises";

export default function ViewSubtitles() {
	const dispatch = useDispatch();

	const Subtitles = useSelector((state) => state.createCourseReducer.subtitles);

	const [Subtitlekey, setSubtitlekey] = useState(-1);
	const [Subtitle, setSubtitle] = useState({});

	const [ShowEditSubtitleModal, setShowEditSubtitleModal] = useState(false);
	const handleEditSubtitleModalClose = () => setShowEditSubtitleModal(false);
	const handleEditSubtitleModalShow = (subtitle, subtitle_key) => {
		setSubtitle(subtitle);
		setSubtitlekey(subtitle_key);
		setShowEditSubtitleModal(true);
	};

	const [ShowAddExerciseModal, setShowAddExerciseModal] = useState(false);
	const handleAddExerciseModalClose = () => setShowAddExerciseModal(false);
	const handleAddExerciseModalShow = (subtitle, subtitle_key) => {
		setSubtitle(subtitle);
		setSubtitlekey(subtitle_key);
		setShowAddExerciseModal(true);
	};

	return (
		<>
			<Accordion>
				{Subtitles.map((subtitle, subtitle_key) => {
					return (
						<Accordion.Item eventKey={`subtitle_${subtitle_key}`} key={`subtitle_${subtitle_key}`}>
							<div className="d-flex">
								<Accordion.Header className="accordionHeaderWidth">
									<h6 className="me-3">Title: {subtitle.title}</h6>
									<h6>Hours: {subtitle.hours}</h6>
								</Accordion.Header>

								<ButtonGroup>
									<Button
										className="accordionTrash"
										key={`subtitle_trash_button_${subtitle_key}`}
										onClick={() => dispatch(removeSubtitle(subtitle_key))}>
										<BsTrash key={"subtitle_trash_" + subtitle_key} className="trashIcon" />
									</Button>
									<Button
										className="accordionTrash"
										key={`subtitle_edit_button_${subtitle_key}`}
										onClick={() => handleEditSubtitleModalShow(subtitle, subtitle_key)}>
										<AiOutlineEdit key={"subtitle_edit_" + subtitle_key} className="trashIcon" />
									</Button>
								</ButtonGroup>
							</div>
							<Accordion.Body>
								<Accordion>
									<Form.Group as={Row}>
										<Form.Group className="mb-3">
											<h5>Exercises</h5>
											<ViewExercises
												subtitleKey={subtitle_key}
												SubtitleExercises={subtitle.exercises}
												delete={false}
											/>
											<Col className="mt-2">
												<Button
													onClick={() => handleAddExerciseModalShow(subtitle, subtitle_key)}
													className="me-3">
													Add Exercise
												</Button>
											</Col>
										</Form.Group>
										<Form.Group className="mb-3">
											<ViewVideos
												subtitle={subtitle}
												subtitleKey={subtitle_key}
												setSubtitle={setSubtitle}
												setSubtitlekey={setSubtitlekey}
												SubtitleVideos={subtitle.videos}
											/>
										</Form.Group>
									</Form.Group>
								</Accordion>
							</Accordion.Body>
						</Accordion.Item>
					);
				})}
			</Accordion>
			{ShowEditSubtitleModal && (
				<AddSubtitleInfo
					case="Edit"
					subtitle={Subtitle}
					subtitleKey={Subtitlekey}
					show={ShowEditSubtitleModal}
					handleClose={handleEditSubtitleModalClose}
				/>
			)}

			{ShowAddExerciseModal && (
				<AddExercise
					case="Add"
					subtitle={Subtitle}
					subtitleKey={Subtitlekey}
					show={ShowAddExerciseModal}
					handleClose={handleAddExerciseModalClose}
				/>
			)}
		</>
	);
}
