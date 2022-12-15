import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Button, Accordion } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { removeSubtitle } from "../../../redux/createCourseSlice";
import { useState } from "react";
import AddSubtitleInfo from "./AddSubtitleInfo";

// import ViewVideos from "./ViewVideos";
// import ViewExercises from "./ViewExercises";

export default function ViewSubtitles() {
	const dispatch = useDispatch();
	const [Subtitlekey, setSubtitlekey] = useState(-1);
	const [Subtitle, setSubtitle] = useState({});
	const [ShowEditSubtitleModal, setShowEditSubtitleModal] = useState(false);
	const handleEditSubtitleModalClose = () => setShowEditSubtitleModal(false);
	const handleEditSubtitleModalShow = (subtitle, subtitle_key) => {
		setSubtitle(subtitle);
		setSubtitlekey(subtitle_key);
		setShowEditSubtitleModal(true);
	};

	const Subtitles = useSelector((state) => state.createCourseReducer.subtitles);
	return (
		<>
			<Accordion>
				{Subtitles.map((subtitle, subtitle_key) => {
					return (
						<Accordion.Item eventKey={`subtitle_${subtitle_key}`} key={`subtitle_${subtitle_key}`}>
							<div className="d-flex">
								<Accordion.Header className="accordionHeaderWidth">
									<h6 className="me-3">{subtitle.title}</h6>
									<h6>Hours: {subtitle.hours}</h6>
								</Accordion.Header>

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
							</div>
							<Accordion.Body>
								<Accordion>
									<Form.Group as={Row}>
										{/* <ViewExercises SubtitleExercises={subtitle.exercises} delete={false} />
									<ViewVideos SubtitleVideos={subtitle.videos} delete={false} /> */}
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
