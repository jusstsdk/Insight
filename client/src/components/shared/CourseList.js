/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useEffect } from "react";
import Pagination from "./pagination/Pagination";
import "./pagination/style.scss";
import UniversalCourseCard from "../UniversalCourseCard";
import axios from "axios";

let pageSize = 5;
export default function CourseList({ courses, currentPage, setCurrentPage, setDetectChange, DetectChange }) {
	let firstPageIndex = (currentPage - 1) * pageSize;
	let lastPageIndex = firstPageIndex + pageSize;
	let currentCourses = courses.slice(firstPageIndex, lastPageIndex);

	// currentCourses = useMemo(() => {
	// 	firstPageIndex = (currentPage - 1) * pageSize;
	// 	lastPageIndex = firstPageIndex + pageSize;
	// 	console.log(courses);
	// 	return courses.slice(firstPageIndex, lastPageIndex);
	// }, [currentPage]);

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [currentPage]);


	return (
		<>
			{currentCourses.map((course, i) => (
				<UniversalCourseCard course={course} cardType={"Deluxe"} setDetectChange={setDetectChange} DetectChange={DetectChange} />
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
