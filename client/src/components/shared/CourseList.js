/* eslint-disable react-hooks/exhaustive-deps */
import CourseCard from "../CourseCard";
import { useState, useMemo, useEffect } from "react";
import Pagination from "./pagination/Pagination";
import "./pagination/style.scss";

let pageSize = 2;
export default function CourseList({ courses, currentPage, setCurrentPage }) {
	let firstPageIndex = (currentPage - 1) * pageSize;
	let lastPageIndex = firstPageIndex + pageSize;
	let currentCourses = courses.slice(firstPageIndex, lastPageIndex);
	// currentCourses = useMemo(() => {
	// 	firstPageIndex = (currentPage - 1) * pageSize;
	// 	lastPageIndex = firstPageIndex + pageSize;
	// 	console.log(courses);
	// 	return courses.slice(firstPageIndex, lastPageIndex);
	// }, [currentPage]);

	return (
		<>
			{currentCourses.map((course, i) => (
				<CourseCard key={"course" + i} course={course} />
			))}
			<Pagination
				className="pagination-bar"
				currentPage={currentPage}
				totalCount={courses.length}
				pageSize={pageSize}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</>
	);
}
