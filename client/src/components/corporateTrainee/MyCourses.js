import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import API from "../../functions/api";
import { useSelector } from "react-redux";
import ListCourses from "../SearchCourses";
import CourseCard from "./NewCourseCard";

const MyCourses = () => {
	const coursesWithId = useSelector((state) => state.userReducer.user.courses);

	let newCourses = [];
	const [courses, setCourses] = useState([]);
	async function getCourses() {
		await Promise.all(
			coursesWithId.map(async (course) => {
				const courseFromDb = await API.get("courses/" + course.course);

				const fullCourse = {
					_id: course.course,
					...courseFromDb.data,
					subtitles: course.subtitles,
					exam: course.exam,
				};

				newCourses.push(fullCourse);
			})
		);
		setCourses(newCourses);
	}
	useEffect(() => {
		getCourses();
	}, []);
	return (
		courses && (
			<div className="course-list">
				{courses.map((course) => (
					<div className="course-preview" key={course._id}>
						<CourseCard course={course} />
					</div>
				))}
			</div>
		)
	);
};

export default MyCourses;
