import { Badge, Col, Row } from "react-bootstrap";

function CourseTitle(props) {
	const course = props.course;
	return (
		<>
			<h2 style={{ display: "inline-block" }}>{course.title} </h2>

			{course.subjects.map((eachSubject) => {
				return (
					<Badge key={eachSubject} bg="primary" className="lead">
						{eachSubject}
					</Badge>
				);
			})}

			<br />
		</>
	);
}

export default CourseTitle;
