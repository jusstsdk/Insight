import { Button, ListGroup, Table, Row, Col } from "react-bootstrap";

import React from "react";
function CourseSubtitlesList({ course }) {
	return (
		<>
			<ListGroup>
				{course.subtitles.map((subtitle, subtitle_index) => {
					return (
						<ListGroup.Item key={`Subtitles_tr_${course._id}_${subtitle_index}`}>
							<Row>
								<Col>#{subtitle_index + 1}</Col>
								<Col>{subtitle.title ? subtitle.title : "No Title."}</Col>
								<Col>{subtitle.hours} Hours</Col>
								{/*
								<Button
									key={"Button Subtitle" + subtitle_index}
									onClick={() =>
										navigate("viewSubtitle", {
											state: {
												courseId: userCourse.course,
												subtitleIndex: subtitle_index,
												subtitle: subtitle,
											},
										})
									}>
									View
								</Button>
							*/}
							</Row>
						</ListGroup.Item>
					);
				})}
			</ListGroup>
		</>
	);
}

export default CourseSubtitlesList;
