import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import SearchCourses from "../../components/SearchCourses";
import CourseCard from "../../components/CourseCard";
import Pagination from "../../components/shared/pagination/Pagination";
import "../../components/shared/pagination/style.scss";
import { Box } from "@mui/material";

let pageSize = 2;
const drawerWidth = "20%";

function ViewInstructorCourses() {
	const instructorId = useSelector((state) => state.userReducer.user._id);
	const user = useSelector((state) => state.userReducer.user);
	/*PAGINATION*/
	//ALL COURSES
	const [Courses, setCourses] = useState([]);
	const [coursesCurrentPage, setCoursesCurrentPage] = useState(1);
	let coursesFirstPageIndex = (coursesCurrentPage - 1) * pageSize;
	let coursesLastPageIndex = coursesFirstPageIndex + pageSize;
	let currentCourses = Courses.slice(coursesFirstPageIndex, coursesLastPageIndex);
	//DRAFTS
	const [Drafts, setDrafts] = useState([]);
	const [draftsCurrentPage, setDraftsCurrentPage] = useState(1);
	let draftsFirstPageIndex = (draftsCurrentPage - 1) * pageSize;
	let draftsLastPageIndex = draftsFirstPageIndex + pageSize;
	let currentDrafts = Drafts.slice(draftsFirstPageIndex, draftsLastPageIndex);
	//PUBLISHED
	const [Published, setPublished] = useState([]);
	const [publishedCurrentPage, setPublishedCurrentPage] = useState(1);
	let publishedFirstPageIndex = (publishedCurrentPage - 1) * pageSize;
	let publishedLastPageIndex = publishedFirstPageIndex + pageSize;
	let currentPublished = Published.slice(publishedFirstPageIndex, publishedLastPageIndex);
	//CLOSED
	const [Closed, setClosed] = useState([]);
	const [closedCurrentPage, setClosedCurrentPage] = useState(1);
	let closedFirstPageIndex = (closedCurrentPage - 1) * pageSize;
	let closedLastPageIndex = closedFirstPageIndex + pageSize;
	let currentClosed = Closed.slice(closedFirstPageIndex, closedLastPageIndex);
	////////////////////////
	const [DetectChange, setDetectChange] = useState(false);
	// Gets all Instructor's Review populated with Trainee's information.
	const getCourses = async () => {
		const config = {
			method: "GET",
			url: `http://localhost:4000/api/instructors/${instructorId}/courses`,
		};
		try {
			const response = await axios(config);
			let courses = response.data.courses;
			courses.forEach((course) => {
				course.originalPrice = (course.originalPrice * user.exchangeRate).toFixed(2);
				course.price = (course.price * user.exchangeRate).toFixed(2);
			});
			let drafts = courses.filter((course) => course.status === "Draft");
			let publishedCourses = courses.filter((course) => course.status === "Published");
			let closedCourses = courses.filter((course) => course.status === "Closed");
			setCourses(courses);
			setDrafts(drafts);
			setPublished(publishedCourses);
			setClosed(closedCourses);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getCourses();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [DetectChange]);
	useEffect(() => {
		let drafts = Courses.filter((course) => course.status === "Draft");
		let publishedCourses = Courses.filter((course) => course.status === "Published");
		let closedCourses = Courses.filter((course) => course.status === "Closed");

		setDrafts(drafts);
		setPublished(publishedCourses);
		setClosed(closedCourses);
	}, [Courses]);
	const mainNavbar = document.getElementById("main-navbar");

	return (
		<Box
			id="asd"
			// key={`course_${Course._id}_content_box`}
			component="main"
			className="search-course-list"
			sx={{
				flexGrow: 1,
				width: {
					sm: `calc(100% - ${drawerWidth}px)`,
				},
			}}>
			<SearchCourses setCourses={setCourses} searchInInstructorCourses={true} />
			<div className="search-course-list"></div>
			<Tabs id="controlled-tab-example" defaultActiveKey="AllCourses" className="mb-3">
				<Tab eventKey="AllCourses" title="All Courses">
					{currentCourses.map((course, i) => (
						<CourseCard
							key={"course_" + i}
							course={course}
							DetectChange={DetectChange}
							setDetectChange={setDetectChange}
							allCourses={true}
						/>
					))}
					<Pagination
						className="pagination-bar"
						currentPage={coursesCurrentPage}
						totalCount={Courses.length}
						pageSize={pageSize}
						onPageChange={(page) => setCoursesCurrentPage(page)}
					/>
				</Tab>
				<Tab eventKey="Drafts" title="Drafts">
					{currentDrafts.map((course, i) => (
						<CourseCard
							key={"course_" + i}
							course={course}
							DetectChange={DetectChange}
							setDetectChange={setDetectChange}
						/>
					))}
					<Pagination
						className="pagination-bar"
						currentPage={draftsCurrentPage}
						totalCount={Drafts.length}
						pageSize={pageSize}
						onPageChange={(page) => setDraftsCurrentPage(page)}
					/>
				</Tab>
				<Tab eventKey="Published" title="Published">
					{currentPublished.map((course, i) => (
						<CourseCard
							key={"course_" + i}
							course={course}
							DetectChange={DetectChange}
							setDetectChange={setDetectChange}
						/>
					))}
					<Pagination
						className="pagination-bar"
						currentPage={publishedCurrentPage}
						totalCount={Published.length}
						pageSize={pageSize}
						onPageChange={(page) => setPublishedCurrentPage(page)}
					/>
				</Tab>
				<Tab eventKey="Closed" title="Closed">
					{currentClosed.map((course, i) => (
						<CourseCard
							key={"course_" + i}
							course={course}
							DetectChange={DetectChange}
							setDetectChange={setDetectChange}
						/>
					))}
					<Pagination
						className="pagination-bar"
						currentPage={closedCurrentPage}
						totalCount={Closed.length}
						pageSize={pageSize}
						onPageChange={(page) => setClosedCurrentPage(page)}
					/>
				</Tab>
			</Tabs>
		</Box>
	);
}
export default ViewInstructorCourses;
