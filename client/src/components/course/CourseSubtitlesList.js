import { Button, Table } from "react-bootstrap";

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CourseSubtitlesList({ course }) {
	const navigate = useNavigate();
	const userCourse = useSelector((state) => state.userReducer.user.courses).filter((aCourse) => {
		return aCourse.course === course._id;
	})[0];

	return (
		<Table striped>
			<thead>
				<tr>
					<th>#</th>
					<th>Title</th>
					<th>Hours</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{userCourse.subtitles.map((subtitle, subtitle_index) => {
					return (
						<tr key={`Subtitles_tr_${course._id}_${subtitle_index}`}>
							<td>{subtitle_index + 1}</td>
							<td>{subtitle.title ? subtitle.title : "No Title."}</td>
							<td>{subtitle.hours}</td>
							<td>
								<Button
									key={"Continue Course" + subtitle_index}
									onClick={() =>
										navigate("continueCourse", {
											state: {
												course: course,
											},
										})
									}>
									View
								</Button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
}

export default CourseSubtitlesList;
