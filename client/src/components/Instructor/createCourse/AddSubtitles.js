import { useState } from "react";
import { Col, Button } from "react-bootstrap";

import ViewSubtitles from "./ViewSubtitles";
import AddSubtitleInfo from "./AddSubtitleInfo";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function AddSubtitle(props) {
	const [AddSubtitleModalShow, setAddSubtitleModalShow] = useState(false);

	return (
		<>
			<h1 className="fs-3 fw-semibold text-muted">Adding Course Subtitles</h1>
			<ViewSubtitles />
			<Col className="nextButton">
				<Button
					className="me-3"
					onClick={() => {
						props.setCurrentTab("addExam");
					}}>
					<AiOutlineArrowLeft />
				</Button>
				<Button className="me-3" onClick={() => setAddSubtitleModalShow(true)}>
					Add a Subtitle
				</Button>
				<Button onClick={props.handleCreateCourse}>Save Course</Button>
			</Col>
			{AddSubtitleModalShow && (
				<AddSubtitleInfo
					case="Add"
					show={AddSubtitleModalShow}
					handleClose={() => setAddSubtitleModalShow(false)}
				/>
			)}
		</>
	);
}
