import { useEffect, useState } from "react";
import SearchCourses from "../../components/SearchCourses";
import CourseList from "../../components/shared/CourseList";
import axios from "axios";
import { useSelector } from "react-redux";
export default function Courses({ isAdmin }) {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const user = useSelector((state) => state.userReducer.user);

  const [DetectChange, setDetectChange] = useState(false);
  const getCourses = async () => {
    const config = {
      method: "GET",
      // headers: { authorization: "Bearer " + token },
      url: `http://localhost:4000/api/courses`,
    };
    try {
      const response = await axios(config);
      let courses = response.data;

      let publishedCourses = courses.filter(
        (course) => course.status === "Published",
      );

      console.log(publishedCourses);

      setCourses(publishedCourses);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DetectChange]);

  console.log(isAdmin);

  return (
    <div className="search-course-list">
      <SearchCourses setCourses={setCourses} setCurrentPage={setCurrentPage} />
      <CourseList
        courses={courses}
        currentPage={currentPage}
        setDetectChange={setDetectChange}
        DetectChange={DetectChange}
        setCurrentPage={setCurrentPage}
        isAdmin={isAdmin}
      />
    </div>
  );
}
