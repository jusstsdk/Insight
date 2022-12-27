import PersonalInfo from "../../components/PersonalInfo";
import MyCourses from "../../components/MyCourses";
import PopularCourses from "../../components/shared/PopularCourses";


function TraineeView() {
	return (
		<>
			<h2>Popular Courses</h2>
			<PopularCourses />
			<h2>My Courses</h2>
			<MyCourses />
		</>
	);
}

export default TraineeView;
