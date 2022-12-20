import { Badge, Col } from "react-bootstrap";

function CourseTitle(props) {
	const course = props.course;
	return (
		<>
			<Col>
				<h2>{course.title}</h2>
			</Col>
			<Col>
				{course.subjects.map((eachSubject) => {
					return (
						<Badge key={eachSubject} bg="primary" className="lead">
							{eachSubject}
						</Badge>
					);
				})}
			</Col>
		</>
	);
}

export default CourseTitle;
