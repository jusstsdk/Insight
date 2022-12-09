import { useDispatch } from "react-redux";
import { Button, Accordion } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";

import { removeSubtitleVideos } from "../../../redux/createCourseSlice";

export default function ViewVideos(props) {
	const dispatch = useDispatch();
	return (
		<Accordion className="w-50">
			{props.SubtitleVideos.map((video, url_key) => {
				return (
					<Accordion.Item eventKey={`video_${url_key}`} key={`video_${url_key}`}>
						<div className="d-flex">
							<Accordion.Header className="accordionHeaderWidth">
								<h6>{video.url}</h6>
							</Accordion.Header>
							{props.delete && (
								<Button
									className="accordionTrash"
									key={`question_trashButton_${url_key}`}
									onClick={() => dispatch(removeSubtitleVideos(url_key))}>
									<BsTrash key={"video_trash_" + url_key} className="trashIcon" />
								</Button>
							)}
						</div>
						<Accordion.Body>{video.description}</Accordion.Body>
					</Accordion.Item>
				);
			})}
		</Accordion>
	);
}
