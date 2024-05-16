import { useState } from "react";
import SearchCourses from "../../components/SearchCourses";
import CourseList from "../../components/shared/CourseList";
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="search-course-list">
      <SearchCourses setCourses={setCourses} setCurrentPage={setCurrentPage} />
      <CourseList
        courses={courses}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
