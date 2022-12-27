import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import SearchCourses from "../../components/SearchCourses";
import CourseList from "../../components/shared/CourseList";
export default function Courses() {
	const [courses, setCourses] = useState([]);

	const [sort, setSort] = useState(false);

	return (
		<div className="course-list">
			<SearchCourses setCourses={setCourses} sort={sort} />
			<Form.Check
				type="checkbox"
				id={"default-checkbox"}
				label="Sort by popularity"
				onChange={() => setSort(!sort)}
			/>
			<CourseList courses={courses} />
		</div>
	);
}
