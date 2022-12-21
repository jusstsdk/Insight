import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import SubtitleVideos from "./SubtitleVideos";

export default function ViewSubtitle() {
	const navigate = useNavigate();
	const location = useLocation();

	const CourseId = location.state.courseId;
	const subtitleIndex = location.state.subtitleIndex;

	return (
		<>
			<SubtitleVideos subtitleIndex={subtitleIndex} CourseId={CourseId} />
			<Button onClick={() => navigate(`/trainee/courses/${CourseId}`)}>Go Back</Button>
		</>
	);
}
