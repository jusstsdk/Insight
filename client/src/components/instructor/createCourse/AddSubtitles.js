import { useState } from "react";
import { Col, Button, Row } from "react-bootstrap";

import ViewSubtitles from "./ViewSubtitles";
import AddSubtitleInfo from "./AddSubtitleInfo";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function AddSubtitle(props) {
	const [AddSubtitleModalShow, setAddSubtitleModalShow] = useState(false);
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

			{/* Navigation */}
			<Col className="mb-3 me-3 fixed-bottom d-flex justify-content-center">
				<Button
					className="me-3"
					onClick={() => {
						props.setCurrentTab("addInfo");
					}}>
					<AiOutlineArrowLeft />
				</Button>

				<Button
					onClick={() => {
						props.setCurrentTab("addExam");
					}}>
					<AiOutlineArrowRight />
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
