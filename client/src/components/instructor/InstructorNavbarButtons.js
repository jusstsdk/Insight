import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function InstructorNavbarButtons() {
  const navigate = useNavigate();
  return (
    <>
      <Nav.Link
        onClick={() => {
          navigate("createCourse", { state: { status: "New" } });
        }}
      >
        Создать курс
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          navigate("viewInstructorCourses");
        }}
      >
        Мои курсы
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          navigate("viewInstructorReports");
        }}
      >
        Отчеты
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          navigate("promotion");
        }}
      >
        Добавить скидку
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          navigate("courses");
        }}
      >
        Каталог
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          navigate("myReports");
        }}
      >
        Поддержка
      </Nav.Link>
    </>
  );
}
