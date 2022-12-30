import { useSelector } from "react-redux";
import CourseCardCheckbox from "../../components/CourseCardCheckbox";

export default function CourseListPromotion({ courses, handleCheck }) {
	const userType = useSelector((state) => state.userReducer.type);
	let filteredCourses = courses;
	if (userType == "Instructor") {
		filteredCourses = filteredCourses.filter(
			(course) =>
				!course.promotion.discount ||
				(course.promotion.endDate < new Date().toISOString().slice(0, 10) &&
					course.promotion.offeredBy == "Administrator") ||
				course.promotion.offeredBy == "Instructor"
		);
	}

	{
		console.log(courses);
		console.log(filteredCourses);
	}
	return filteredCourses.map((course) => (
		<>
			<CourseCardCheckbox key={course._id} course={course} handleCheck={handleCheck} />
		</>
	));
}
