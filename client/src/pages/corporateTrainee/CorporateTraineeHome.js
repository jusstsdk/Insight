import MyCourses from "../../components/MyCourses";
import PopularCourses from "../../components/shared/PopularCourses";
import { useSelector } from "react-redux";

export default function CorporateTraineeHome() {
	const { firstName, lastName, gender, courses, paymentMethods } = useSelector(
		(state) => state.userReducer.user
	);
	return (
		<>
			<h2>Popular Courses</h2>
			<PopularCourses />
		</>
	);
}
