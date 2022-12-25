import { Badge, Col, Row } from "react-bootstrap";

function CourseTitle(props) {
	const course = props.course;
	return (
		<div className="page-header" key="titleDiv">
			<h1 style={{ display: "inline-block" }} key="titleHeader">
				{course.title + " "}
			</h1>
			&nbsp;&nbsp;&nbsp;&nbsp;
			{course.subjects.map((eachSubject, i) => {
				return (
					<>
						<Badge
							key={"Badge of Subject: " + i + eachSubject}
							bg="primary"
							className="lead"
						>
							{eachSubject}
						</Badge>
						&nbsp;
					</>
				);
			})}
			<br />
			<br />
		</div>
	);
}

export default CourseTitle;
