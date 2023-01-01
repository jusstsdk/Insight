import { Button, ListGroup, Table, Row, Col } from "react-bootstrap";
import { MdTimer } from "react-icons/md";
import React from "react";
function CourseSubtitlesList({ course }) {
	return (
		<>
			<h3 className="fst-italic">Subtitles</h3>
			<Col sm={8}>
				<ListGroup variant="flush">
					{course.subtitles.map((subtitle, subtitle_index) => {
						return (
							<ListGroup.Item className="ps-0" key={`Subtitles_tr_${course._id}_${subtitle_index}`}>
								<Row>
									<Col sm={1}>#{subtitle_index + 1}</Col>
									<Col sm={8}>{subtitle.title ? subtitle.title : "No Title."}</Col>
									<Col sm={3} className="d-flex align-items-center">
										<MdTimer className="me-1" />
										<p className="fitWidth lead mb-0">{Math.ceil(subtitle.seconds / 60)} Minutes</p>
									</Col>
								</Row>
							</ListGroup.Item>
						);
					})}
				</ListGroup>
			</Col>
		</>
	);
}

export default CourseSubtitlesList;
