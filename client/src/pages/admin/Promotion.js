import { useState } from "react";
import { useSelector } from "react-redux";
import PromotionForm from "../../components/PromotionForm";
import SearchCourses from "../../components/SearchCourses";
import CourseListPromotion from "./CourseListPromotion";
import { ListGroup } from "react-bootstrap";

export default function Promotion() {
	const [courses, setCourses] = useState([]);
	const [checkedCourses, setCheckedCourses] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const userType = useSelector((state) => state.userReducer.type);

	function handleCheck(event) {
		let updatedList = [...checkedCourses];
		if (event.target.checked) {
			updatedList = [...checkedCourses, event.target.value];
		} else {
			updatedList.splice(checkedCourses.indexOf(event.target.value), 1);
		}
		setCheckedCourses(updatedList);
	}

	return (
		<>
			<div className="search-course-list">
				<PromotionForm courses={checkedCourses} />
				<SearchCourses
					setCourses={setCourses}
					searchInInstructorCourses={userType === "Instructor"}
				/>
				<CourseListPromotion courses={courses} handleCheck={handleCheck} />
			</div>
			<ListGroup>
				{checkedCourses.map((course) => {
					<ListGroup.Item>{course.title}</ListGroup.Item>;
				})}
			</ListGroup>
		</>
	);
}
