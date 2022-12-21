import CourseCard from "../CourseCard";

export default function CourseList({ courses }) {
	return courses.map((course, i) => (
		<CourseCard key={"course" + i} course={course} />
	));
}
