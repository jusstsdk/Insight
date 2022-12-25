import { useEffect, useState } from "react";
import SearchCourses from "../../components/SearchCourses";
import CourseList from "../../components/shared/CourseList";
import api from "../../functions/api";
export default function Courses() {
	const [courses, setCourses] = useState([]);
	// async function getCourses() {
	// 	const response = await api.get("courses");
	// 	setCourses(response.data);
	// 	console.log(response.data);
	// }
	// useEffect(() => {
	// 	getCourses();
	// }, []);

	return (
		<div className="course-list">
			<SearchCourses setCourses={setCourses} />
			<CourseList courses={courses} />
		</div>
	);
}
