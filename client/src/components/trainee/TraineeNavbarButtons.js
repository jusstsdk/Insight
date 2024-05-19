import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function TraineeNavbarButtons() {
  const navigate = useNavigate();

  return (
    <>
      <Nav.Link
        onClick={() => {
          navigate("courses");
        }}
      >
        Каталог
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          navigate("myCourses");
        }}
      >
        Мои курсы
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          navigate("myReports");
        }}
      >
        Мои отчеты
      </Nav.Link>
    </>
  );
}
