import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import CourseReportsCard from "../../components/admin/CourseReportsCard";
import Pagination from "../../components/shared/pagination/Pagination";
import { useSelector } from "react-redux";

let pageSize = 12;

const ViewInstructorReports = () => {
  const [Courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const firstPageIndex = (currentPage - 1) * pageSize;
  const lastPageIndex = firstPageIndex + pageSize;
  const currentCourses = Courses.slice(firstPageIndex, lastPageIndex);
  const user = useSelector((state) => state.userReducer.user);

  const getReports = async () => {
    const config = {
      method: "GET",
      url: `http://localhost:4000/api/reports/instructor/${user._id}`,
    };
    try {
      const response = await axios(config);
      setCourses(response.data.courses);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="my-2 d-flex flex-wrap">
      <Card.Body className="d-flex flex-wrap">
        {currentCourses.map((course, i) => (
          <Col key={i} sm={4} className=" p-1 ">
            <CourseReportsCard
              course={course}
              redirectUrl={"/instructor/viewInstructorCourseReports"}
            />
          </Col>
        ))}
      </Card.Body>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={Courses.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Container>
  );
};

export default ViewInstructorReports;
