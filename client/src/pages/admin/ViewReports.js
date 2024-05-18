import { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import axios from "axios";
import CourseReportsCard from "../../components/admin/CourseReportsCard";
import Pagination from "../../components/shared/pagination/Pagination";
import {useSelector} from "react-redux";
let pageSize = 12;
function ViewReports() {
  const [Courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let firstPageIndex = (currentPage - 1) * pageSize;
  let lastPageIndex = firstPageIndex + pageSize;
  let currentCourses = Courses.slice(firstPageIndex, lastPageIndex);
  const token = useSelector((state) => state.userReducer.token);
  const getReports = async () => {
    const config = {
      method: "GET",				headers: { authorization: "Bearer " + token },
      url: `http://localhost:4000/api/reports/`,
    };
    try {
      const response = await axios(config);
      setCourses(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentCourses]);

  return (
    <Container className="my-2 d-flex flex-wrap">
      <Card.Body className="d-flex flex-wrap">
        {currentCourses.map((course, i) => (
          <Col key={i} sm={4} className=" p-1 ">
            <CourseReportsCard
              course={course}
              redirectUrl={"/admin/viewCourseReports"}
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
}
export default ViewReports;
