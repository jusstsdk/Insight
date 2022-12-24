import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CourseReportsCard(props) {
	const navigate = useNavigate();
	const ViewCourseReports = () => {
		navigate("/admin/viewCourseReports", { state: props.course });
	};
	return (
		<Card>
			<Card.Body>
				<Card.Title>{props.course.title}</Card.Title>
				<Card.Text>Number of reports: {props.course.reports.length}</Card.Text>
				<Button onClick={() => ViewCourseReports()} variant="primary">
					View Reports
				</Button>
			</Card.Body>
		</Card>
	);
}

export default CourseReportsCard;
