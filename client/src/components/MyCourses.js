import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import API from "../functions/api";
import { useSelector, useDispatch } from "react-redux";
import { setCourses } from "../redux/userSlice";
import CourseCard from "./CourseCard";
import Pagination from "./shared/pagination/Pagination";
import "./shared/pagination/style.scss";
let pageSize = 2;
const MyCourses = () => {
	const [myCourses, setMyCourses] = useState([]);
	const user = useSelector((state) => state.userReducer.user);
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	let firstPageIndex = (currentPage - 1) * pageSize;
	let lastPageIndex = firstPageIndex + pageSize;
	let currentCourses = myCourses.slice(firstPageIndex, lastPageIndex);

	const coursesWithId = useSelector((state) => state.userReducer.user.courses);

	async function getCourses() {
		let newCourses = [];
		await Promise.all(
			coursesWithId.map(async (course) => {
				let courseFromDb;
				if (course.course === undefined) {
					courseFromDb = await API.get("courses/" + course._id);
				} else {
					courseFromDb = await API.get("courses/" + course.course);
				}

				const fullCourse = {
					_id: course.course,
					...courseFromDb.data,
					subtitles: course.subtitles,
					exam: course.exam,
					progress : course.progress,
					paidPrice : course.paidPrice,
				};
        
				fullCourse.originalPrice = (
					fullCourse.originalPrice * user.exchangeRate
				).toFixed(2);
				fullCourse.price = (fullCourse.price * user.exchangeRate).toFixed(2);

				newCourses.push(fullCourse);
			})
		);
		setMyCourses(newCourses);
	}

	useEffect(() => {
		getCourses();
	}, []);

	return (
		myCourses && (
			<div className="course-list">
				{currentCourses.map((course) => (
					<div className="course-preview" key={course._id}>
						<CourseCard course={course} />
					</div>
				))}
				<Pagination
					className="pagination-bar"
					currentPage={currentPage}
					totalCount={myCourses.length}
					pageSize={pageSize}
					onPageChange={(page) => setCurrentPage(page)}
				/>
			</div>
		)
	);
};

export default MyCourses;
