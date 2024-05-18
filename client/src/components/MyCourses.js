import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import API from "../functions/api";
import { useSelector, useDispatch } from "react-redux";
import { setCourses } from "../redux/userSlice";
import CourseCard from "./CourseCard";
import "./shared/pagination/style.scss";
import UniversalCourseCard from "./UniversalCourseCard";
import { Tab, Tabs } from "react-bootstrap";
import Pagination from "./shared/pagination/Pagination";
let pageSize = 2;
const MyCourses = () => {
	const [myCourses, setMyCourses] = useState([]);
	const user = useSelector((state) => state.userReducer.user);
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	let firstPageIndex = (currentPage - 1) * pageSize;
	let lastPageIndex = firstPageIndex + pageSize;
	let currentCourses = myCourses.slice(firstPageIndex, lastPageIndex);

	const [InProgressCourses, setInProgressCourses] = useState([]);
	const [InProgressCurrentPage, setInProgressCurrentPage] = useState(1);
	let InProgressFirstPageIndex = (InProgressCurrentPage - 1) * pageSize;
	let InProgressLastPageIndex = InProgressFirstPageIndex + pageSize;
	let InProgressCurrentCourses = InProgressCourses.slice(
		InProgressFirstPageIndex,
		InProgressLastPageIndex
	);


	const [CompletedCourses, setCompletedCourses] = useState([]);
	const [CompletedCurrentPage, setCompletedCurrentPage] = useState(1);
	let CompletedFirstPageIndex = (CompletedCurrentPage - 1) * pageSize;
	let CompletedLastPageIndex = CompletedFirstPageIndex + pageSize;
	let CompletedCurrentCourses = CompletedCourses.slice(
		CompletedFirstPageIndex,
		CompletedLastPageIndex
	);

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [InProgressCurrentPage, CompletedCurrentPage]);

	const coursesWithId = useSelector((state) => state.userReducer.user.courses);
	const token = useSelector((state) => state.userReducer.token);
	async function getCourses() {
		let newCourses = [];
		await Promise.all(
			coursesWithId.map(async (course) => {
				let courseFromDb;
				if (course.course === undefined) {
					courseFromDb = await API.get("courses/" + course._id, {        headers: { authorization: "Bearer " + token }});
				} else {
					courseFromDb = await API.get("courses/" + course.course, {});
				}

				const fullCourse = {
					_id: course.course,
					...courseFromDb.data,
					subtitles: course.subtitles,
					exam: course.exam,
					progress: course.progress,
					paidPrice: course.paidPrice,
				};

				fullCourse.originalPrice = (
					fullCourse.originalPrice * user.exchangeRate
				).toFixed(2);
				fullCourse.price = (fullCourse.price * user.exchangeRate).toFixed(2);

				newCourses.push(fullCourse);
			})
		);
		setCompletedCourses(newCourses.filter((course) => course.progress === 1));
		setInProgressCourses(newCourses.filter((course) => course.progress < 1));
		setMyCourses(newCourses);
	}

	useEffect(() => {
		getCourses();
	}, []);

	return (
		myCourses && (
			<div className="course-list">
				<Tabs
					defaultActiveKey="InProgress"
					id="justify-tab-example"
					className="mb-3"
					justify
				>
					<Tab eventKey="InProgress" title="In progress">
						<div className="course-list">
							{InProgressCurrentCourses.map((course) => (
								<UniversalCourseCard course={course} cardType={"Basic"} />
							))}
							<Pagination
								className="pagination-bar"
								currentPage={InProgressCurrentPage}
								totalCount={InProgressCourses.length}
								pageSize={pageSize}
								onPageChange={(page) => setInProgressCurrentPage(page)}
							/>
						</div>
					</Tab>
					<Tab eventKey="Completed" title="Completed courses">
						<div className="course-list">
							{CompletedCurrentCourses.map((course) => (
								<UniversalCourseCard course={course} cardType={"Basic"} />
							))}
							<Pagination
								className="pagination-bar"
								currentPage={CompletedCurrentPage}
								totalCount={CompletedCourses.length}
								pageSize={pageSize}
								onPageChange={(page) => setCompletedCurrentPage(page)}
							/>
						</div>
					</Tab>
				</Tabs>
			</div>
		)
	);
};

export default MyCourses;
