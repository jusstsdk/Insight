import { useEffect, useState } from "react";
import api from "../../functions/api";
import { useSelector } from "react-redux";
import "./pagination/style.scss";
import UniversalCourseCard from "../UniversalCourseCard";

const PopularCourses = () => {
  const user = useSelector((state) => state.userReducer.user);

  const [courses, setCourses] = useState([]);

  function comparePopularity(a, b) {
    if (a.enrolledTrainees.length > b.enrolledTrainees.length) return -1;
    if (a.enrolledTrainees.length < b.enrolledTrainees.length) return 1;
    return 0;
  }

  async function getCourses() {
    const response = await api.get("courses");
    response.data = response.data.filter(
      (course) => course.status === "Published",
    );
    response.data.forEach((course) => {
      course.originalPrice = (course.originalPrice * user.exchangeRate).toFixed(
        2,
      );
      course.price = (course.price * user.exchangeRate).toFixed(2);
    });

    const result = response.data.sort(comparePopularity)

    setCourses(result.slice(0, 3));
  }
  useEffect(() => {
    getCourses();
  }, [user.currency]);

  return (
    <div className="course-list">
      {courses.map((course) => (
        <UniversalCourseCard
          key={course._id + "POP"}
          course={course}
          cardType={"Basic"}
        />
      ))}
    </div>
  );
};

export default PopularCourses;
