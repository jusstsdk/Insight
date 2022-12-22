import { useLocation } from "react-router-dom";
import ContinueCourse from "../../components/ContinueCourse";

export default function ViewSubtitle() {
	const location = useLocation();

	const CourseId = location.state.courseId;
	const subtitleIndex = location.state.subtitleIndex;
	const subtitles = location.state.subtitles;

	return (
		<>
			<ContinueCourse
				key={`course${CourseId}_drawer`}
				subtitleIndex={subtitleIndex}
				CourseId={CourseId}
				subtitles={subtitles}
			/>
			{/* <SubtitleVideos subtitleIndex={subtitleIndex} CourseId={CourseId} /> */}
		</>
	);
}
