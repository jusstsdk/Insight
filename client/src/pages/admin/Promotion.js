import { useState } from "react";
import { useSelector } from "react-redux";
import PromotionForm from "../../components/PromotionForm";
import SearchCourses from "../../components/SearchCourses";
import CourseListPromotion from "./CourseListPromotion";
import { ListGroup, ListGroupItem } from "react-bootstrap";

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
		console.log("OMG");
	}

	return (
		<>
			<ListGroup>
				<ListGroupItem>HI</ListGroupItem>
				{checkedCourses.forEach((course) => {
					console.log(course);
					<ListGroup.Item>{course.title}</ListGroup.Item>;
				})}
			</ListGroup>
			<div className="search-course-list">
				<PromotionForm courses={checkedCourses} />
				<SearchCourses
					setCourses={setCourses}
					searchInInstructorCourses={userType === "Instructor"}
					setCurrentPage={setCurrentPage}
				/>
				<CourseListPromotion
					courses={courses}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					handleCheck={handleCheck}
				/>
			</div>
		</>
	);
}
