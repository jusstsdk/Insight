import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PromotionForm from "../../components/PromotionForm";
import SearchCourses from "../../components/SearchCourses";
import CourseListPromotion from "./CourseListPromotion";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import api from "../../functions/api";

export default function Promotion() {
	const [courses, setCourses] = useState([]);
	const [checkedCourses, setCheckedCourses] = useState([]);
	const [completeCheckedCourses, setCompleteCheckedCourses] = useState([]);
	const [allCourses, setAllCourses] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const userType = useSelector((state) => state.userReducer.type);
	const user = useSelector((state) => state.userReducer.user);

	function handleCheck(event) {
		let updatedList = [...checkedCourses];
		let completeUpdatedList = [...completeCheckedCourses];

		if (event.target.checked) {
			updatedList = [...checkedCourses, event.target.value];

			let completeCourse;

			allCourses.forEach((myCompleteCourse) => {
				if (myCompleteCourse._id === event.target.value) {
					completeCourse = myCompleteCourse;
				}
			});

			completeUpdatedList = [...completeCheckedCourses, completeCourse];
		} else {
			updatedList.splice(updatedList.indexOf(event.target.value), 1);

			completeUpdatedList.splice(
				completeUpdatedList.findIndex((object) => {
					return object._id === event.target.value;
				}),
				1
			);
		}
		setCheckedCourses(updatedList);
		setCompleteCheckedCourses(completeUpdatedList);
	}

	async function getAllCourses() {
		try {
			let response = await api.get(`courses/`);
			response.data.forEach((course) => {
				course.price = (course.price * user.exchangeRate).toFixed(2);
				course.originalPrice = (course.originalPrice * user.exchangeRate).toFixed(2);
			});
			setAllCourses(response.data);
		} catch (e) {}
	}
	useEffect(() => {
		getAllCourses();
	}, []);

	return (
		<>
			<div className="search-course-list">
				<PromotionForm courses={checkedCourses} />
				<SearchCourses
					setCourses={setCourses}
					searchInInstructorCourses={userType === "Instructor"}
					setCurrentPage={setCurrentPage}
				/>

				<CourseListPromotion
					courses={courses}
					checkedCourses={checkedCourses}
					completeCheckedCourses={completeCheckedCourses}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					handleCheck={handleCheck}
				/>
			</div>
		</>
	);
}
