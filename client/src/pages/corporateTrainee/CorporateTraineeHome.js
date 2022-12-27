import MyCourses from "../../components/MyCourses";
import PopularCourses from "../../components/shared/PopularCourses";
export default function CorporateTraineeHome() {
	return (
		<>

			<h2>Popular Courses</h2>
			<PopularCourses />
			<h2>My Courses</h2>
			<MyCourses />
		</>
	);
}
