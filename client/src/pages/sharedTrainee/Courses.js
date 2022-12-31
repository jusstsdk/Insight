import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import SearchCourses from "../../components/SearchCourses";
import CourseList from "../../components/shared/CourseList";
export default function Courses() {
	const [courses, setCourses] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [sort, setSort] = useState(false);

	return (
		<div className="course-list">
			<SearchCourses setCourses={setCourses} setCurrentPage={setCurrentPage} sort={sort} />
			<Form.Check
				type="checkbox"
				id={"default-checkbox"}
				label="Sort by popularity"
				onChange={() => setSort(!sort)}
			/>
			<CourseList courses={courses} currentPage={currentPage} setCurrentPage={setCurrentPage} />
		</div>
	);
}
