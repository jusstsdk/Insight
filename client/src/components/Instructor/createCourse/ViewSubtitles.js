import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Row, Button, Accordion } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

import { removeSubtitle } from "../../../redux/createCourseSlice";

import AddSubtitleInfo from "./AddSubtitleInfo";
import ViewVideos from "./ViewVideos";
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

	return (
		<>
			<Accordion className="mt-2">
				{Subtitles.map((subtitle, subtitle_key) => {
					return (
						<Accordion.Item eventKey={`subtitle_${subtitle_key}`} key={`subtitle_${subtitle_key}`}>
							<div className="d-flex">
								<Col sm={11} className="me-auto">
									<Accordion.Header className="accordionHeaderWidth">
										<h6 className="me-3">Title: {subtitle.title}</h6>
										<h6>Hours: {subtitle.hours}</h6>
									</Accordion.Header>
								</Col>
								<Col sm={1} className="d-flex justify-content-end">
									<Button
										variant="success"
										style={{ zIndex: 1000 }}
										className="accordionTrash accordionLikeEditButton"
										key={`subtitle_edit_button_${subtitle_key}`}
										onClick={() => handleEditSubtitleModalShow(subtitle, subtitle_key)}>
										<AiOutlineEdit key={"subtitle_edit_" + subtitle_key} />
									</Button>
									<Button
										className="accordionTrash accordionLikeDeleteButton"
										variant="danger"
										key={`subtitle_trash_button_${subtitle_key}`}
										onClick={() => dispatch(removeSubtitle(subtitle_key))}>
										<BsTrash key={"subtitle_trash_" + subtitle_key} />
									</Button>
								</Col>
							</div>
							<Accordion.Body>
								<Accordion>
									<Form.Group as={Row}>
										<Form.Group className="mb-3">
											<ViewExercises
												subtitle={subtitle}
												subtitleKey={subtitle_key}
												setSubtitle={setSubtitle}
												setSubtitlekey={setSubtitlekey}
												SubtitleExercises={subtitle.exercises}
											/>
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
		</>
	);
}
