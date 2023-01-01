import { useSelector } from "react-redux";
import CourseCardCheckbox from "../../components/CourseCardCheckbox";
import Pagination from "../../components/shared/pagination/Pagination";
import UniversalCourseCard from "../../components/UniversalCourseCard";

let pageSize = 2;
export default function CourseListPromotion({
	courses,
	checkedCourses,
	completeCheckedCourses,
	handleCheck,
	currentPage,
	setCurrentPage,
}) {
	const userType = useSelector((state) => state.userReducer.type);

	let filteredCourses = courses;
	if (userType === "Instructor") {
		filteredCourses = filteredCourses.filter(
			(course) =>
				!course.promotion.discount ||
				(course.promotion.endDate < new Date().toISOString().slice(0, 10) &&
					course.promotion.offeredBy === "Administrator") ||
				course.promotion.offeredBy === "Instructor"
		);
	}
	let firstPageIndex = (currentPage - 1) * pageSize;
	let lastPageIndex = firstPageIndex + pageSize;
	let currentCourses = filteredCourses.slice(firstPageIndex, lastPageIndex);

	return (
		<>
			{currentCourses.map(
				(course) =>
					!checkedCourses.includes(course._id) && (
						<UniversalCourseCard
							key={course._id}
							course={course}
							handleCheck={handleCheck}
							defaultChecked={false}
							bg="light"
							cardType={"Discount"}
						/>
					)
			)}
			{completeCheckedCourses.map((course) => (
				<UniversalCourseCard
					key={course._id}
					course={course}
					handleCheck={handleCheck}
					defaultChecked={true}
					bg="warning"
					cardType={"Discount"}
				/>
			))}
			<Pagination
				className="pagination-bar"
				currentPage={currentPage}
				totalCount={filteredCourses.length}
				pageSize={pageSize}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</>
	);
}
