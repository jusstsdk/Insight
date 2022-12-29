import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
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
