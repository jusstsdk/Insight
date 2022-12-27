import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import SearchCourses from "../../components/SearchCourses";
import CourseList from "../../components/shared/CourseList";
import api from "../../functions/api";
export default function Courses() {
	const [courses, setCourses] = useState([]);
	const [displayedCourses, setDisplayedCourses] = useState();
	
	const [sort, setSort] = useState(false);

	function comparePopularity(a, b) {
		if (a.enrolledTrainees.length > b.enrolledTrainees.length) return -1;
		if (a.enrolledTrainees.length < b.enrolledTrainees.length) return 1;
		return 0;
	}
	function sortCourses(){
		const tempSort = !sort;	
		if (tempSort){
			const tempCourses = [...courses];
			tempCourses.sort(comparePopularity);
			setDisplayedCourses(tempCourses);
		} else {
			setDisplayedCourses(courses);
		}

		setSort(tempSort);
	}
	
	

	
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
			<Form.Check
						type="checkbox"
						id={"default-checkbox"}
						label="Sort by popularity"
						onChange={() => sortCourses()}
			/>
			{!displayedCourses && <CourseList courses={courses} />}
			{displayedCourses && <CourseList courses={displayedCourses} />}
		</div>
	);
}
