import RequestCard from "../../components/admin/RequestCard";
import Pagination from "../../components/shared/pagination/Pagination";
import { useState, useEffect } from "react";
import api from "../../functions/api";
import { Container, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import UniversalCourseCard from "../../components/UniversalCourseCard";
let pageSize = 1;
const CourseRequests = () => {
  const [traineeRequests, setTraineeRequests] = useState([]);
  const [DetectChange, setDetectChange] = useState(false);
  const token = useSelector((state) => state.userReducer.token);
  const [currentPage, setCurrentPage] = useState(1);
  let firstPageIndex = (currentPage - 1) * pageSize;
  if (traineeRequests.length !== 0) {
    if (firstPageIndex > traineeRequests.length - 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  let lastPageIndex = firstPageIndex + pageSize;
  let currentRequests = traineeRequests.slice(firstPageIndex, lastPageIndex);

  function filterPendingRequests(requests) {
    return (
      requests.filter((request) => request.status.toLowerCase() === "pending")
        .length > 0
    );
  }

  async function getPendingTrainees() {
    const response = await api.get("/administrators/requests", {
      headers: { authorization: "Bearer " + token },
    });
    console.log(response.data);
    setTraineeRequests(response.data);
  }
  useEffect(() => {
    getPendingTrainees();
  }, [DetectChange]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <h1>Заявки на курсы</h1>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={traineeRequests.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {currentRequests.map((course) => (
        <UniversalCourseCard
          course={course}
          cardType={"Deluxe"}
          setDetectChange={setDetectChange}
          DetectChange={DetectChange}
          isAdmin={true}
        />
      ))}
    </>
  );
};

export default CourseRequests;
