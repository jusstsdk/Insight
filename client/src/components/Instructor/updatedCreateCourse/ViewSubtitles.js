import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Button, Accordion } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";

import { removeSubtitle } from "../../../redux/createCourseSlice";

import ViewVideos from "./ViewVideos";
import ViewExercises from "./ViewExercises";

export default function ViewSubtitles() {
	const dispatch = useDispatch();

	const Subtitles = useSelector((state) => state.createCourseReducer.subtitles);
	return (
		<Accordion>
			{Subtitles.map((subtitle, subtitle_key) => {
				return (
					<Accordion.Item eventKey={`subtitle_${subtitle_key}`} key={`subtitle_${subtitle_key}`}>
						<div className="d-flex">
							<Accordion.Header className="accordionHeaderWidth">
								{subtitle.title} {subtitle.hours}
							</Accordion.Header>

							<Button
								className="accordionTrash"
								key={`subtitle_trashButton_${subtitle_key}`}
								onClick={() => dispatch(removeSubtitle(subtitle_key))}>
								<BsTrash key={"subtitle_trash_" + subtitle_key} className="trashIcon" />
							</Button>
						</div>
						<Accordion.Body>
							<Accordion>
								<Form.Group as={Row}>
									<ViewExercises SubtitleExercises={subtitle.exercises} delete={false} />
									<ViewVideos SubtitleVideos={subtitle.videos} delete={false} />
								</Form.Group>
							</Accordion>
						</Accordion.Body>
					</Accordion.Item>
				);
			})}
		</Accordion>
	);
}
