import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CourseReportsCard(props) {
	const navigate = useNavigate();
	const ViewCourseReports = () => {
		navigate("/admin/viewCourseReports", { state: props.course });
	};
	return (
		<Card bg="lightGrey" className="h-100">
			<Card.Body className="d-flex flex-column justify-content-start">
				<Card.Title>{props.course.title}</Card.Title>
				<Card.Text>Number of reports: {props.course.reports.length}</Card.Text>
				<Button className="mt-auto" onClick={() => ViewCourseReports()} variant="outline-primary">
					View Reports
				</Button>
			</Card.Body>
		</Card>
	);
}

export default CourseReportsCard;
