import { useState } from "react";
import { Col, Button, Row } from "react-bootstrap";

import ViewSubtitles from "./ViewSubtitles";
import AddSubtitleInfo from "./AddSubtitleInfo";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useLocation } from "react-router-dom";

export default function AddSubtitle(props) {
	const location = useLocation();
	const [AddSubtitleModalShow, setAddSubtitleModalShow] = useState(false);
	const status = location.state.status;
	return (
		<>
			<Row>
				<Col>
					<h1 className="fs-3 fw-semibold text-muted">Adding Course Subtitles</h1>
				</Col>
				<Col className="d-flex justify-content-end">
					<Button onClick={() => setAddSubtitleModalShow(true)}>Add a Subtitle</Button>
				</Col>
			</Row>
			<ViewSubtitles />
			<Col className="mb-3 me-3 fixed-bottom d-flex justify-content-center">
				<Button
					className="me-3"
					onClick={() => {
						props.setCurrentTab("addExam");
					}}>
					<AiOutlineArrowLeft />
				</Button>

				<Button
					className="me-3"
					onClick={() => {
						if (status === "New") props.handleCreateCourse("Draft");
						else props.handleEditCourse("Draft");
					}}>
					Save Course
				</Button>
				<Button
					onClick={() => {
						if (status === "New") props.handleCreateCourse("Published");
						else props.handleEditCourse("Published");
					}}>
					Publish Course
				</Button>
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
