import { useState } from "react";
import SearchCourses from "../../components/SearchCourses";
import CourseList from "../../components/shared/CourseList";

export default function Courses() {
	const [courses, setCourses] = useState([]);

	return (
		<div className="course-list">
			<SearchCourses setCourses={setCourses} />
			<CourseList courses={courses} />
		</div>
	);
}
