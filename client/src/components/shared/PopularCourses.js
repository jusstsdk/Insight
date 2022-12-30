import { Carousel } from "react-bootstrap";
import { useEffect, useState } from "react";
import api from "../../functions/api";
import CourseCard from "../CourseCard";
import { useSelector } from "react-redux";
import Pagination from "./pagination/Pagination";
import "./pagination/style.scss";
let pageSize = 1;
let coursesNumber = 3;
const PopularCourses = () => {
	const [courses, setCourses] = useState([]);
	const user = useSelector((state) => state.userReducer.user);
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
		response.data.forEach((course) => {
			course.originalPrice = (
				course.originalPrice * user.exchangeRate
			).toFixed(2);
			course.price = (course.price * user.exchangeRate).toFixed(2);
		});
		if(response.data.length < coursesNumber){
			coursesNumber = response.data.length;
		}
		
		setCourses(response.data.sort(comparePopularity));
	}
	useEffect(() => {
		getCourses();
	}, []);

	return (
		<div className="course-list">
			{currentCourses.slice(0, coursesNumber).map((course) => (
				<CourseCard course={course} key={course._id} />
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
