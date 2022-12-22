import { useLocation } from "react-router-dom";
import ContinueCourse from "../../components/ContinueCourse";

export default function ViewSubtitle() {
	const location = useLocation();

	const CourseId = location.state.courseId;

	return <ContinueCourse CourseId={CourseId} />;
}
