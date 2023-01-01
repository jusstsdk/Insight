import { Carousel } from "react-bootstrap";
import { useEffect, useState } from "react";
import api from "../../functions/api";
import CourseCard from "../CourseCard";
import { useSelector } from "react-redux";
import Pagination from "./pagination/Pagination";
import "./pagination/style.scss";
import UniversalCourseCard from "../UniversalCourseCard";
let pageSize = 1;
let coursesNumber = 3;
const PopularCourses = () => {
	const user = useSelector((state) => state.userReducer.user);

	const [courses, setCourses] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	let firstPageIndex = (currentPage - 1) * pageSize;
	let lastPageIndex = firstPageIndex + pageSize;
	let currentCourses = courses.slice(firstPageIndex, lastPageIndex);

	function comparePopularity(a, b) {
		if (a.enrolledTrainees.length > b.enrolledTrainees.length) return -1;
		if (a.enrolledTrainees.length < b.enrolledTrainees.length) return 1;
		return 0;
	}

	async function getCourses() {
		const response = await api.get("courses");
		response.data = response.data.filter((course) => course.status === "Published");
		response.data.forEach((course) => {
			course.originalPrice = (course.originalPrice * user.exchangeRate).toFixed(
				2
			);
			course.price = (course.price * user.exchangeRate).toFixed(2);
		});
		if (response.data.length < coursesNumber) {
			coursesNumber = response.data.length;
		}

		setCourses(response.data.sort(comparePopularity));
	}
	useEffect(() => {
		getCourses();
	}, [user.currency]);	

	return (
		<div className="course-list">
			{currentCourses.slice(0, coursesNumber).map((course) => (
				<UniversalCourseCard
					key={course._id + "POP"}
					course={course}
					cardType={"Basic"}
				/>
			))}
			<Pagination
				className="pagination-bar"
				currentPage={currentPage}
				totalCount={coursesNumber}
				pageSize={pageSize}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</div>
	);
};

export default PopularCourses;
