import { useState } from "react";
import ListCourses from "../../components/SearchCourses";
import CourseCard from "../../components/CourseCard";

const CourseList = () => {
	const [courses, setCourses] = useState([]);

	return (
		<div className="course-list">
			<ListCourses setCourses={setCourses} />
			{courses &&
				courses.map((course, i) => (
					<CourseCard key={"course" + i} course={course} />
				))}
		</div>
	);
};

export default CourseList;
