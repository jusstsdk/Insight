import { Col } from "react-bootstrap";

function CourseSummaryPrevVid(props) {
	const course = props.course;
	return (
		<>
			<Col>
				<h5>Summary</h5>

				<p className="lead">{course.summary}</p>
			</Col>
			<Col>
				<h5>Preview Video</h5>
				<iframe
					width="560"
					height="315"
					src={course.previewVideo} //SHOULD BE {course.previewVideo} ONCE WE FIX DATABASE
					title="Preview Video"
					allowFullScreen
				/>
			</Col>
		</>
	);
}

export default CourseSummaryPrevVid;
