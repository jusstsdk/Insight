import { Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AdminNavbarButtons() {
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
      <NavDropdown title="Создать пользователя" id="basic-nav-dropdown">
        <NavDropdown.Item
          onClick={() => {
            navigate("createAdmin");
          }}
        >
          Админ
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={() => {
            navigate("createInstructor");
          }}
        >
          Инструктор
        </NavDropdown.Item>
      </NavDropdown>
      <Nav.Link
        onClick={() => {
          navigate("users");
        }}
      >
        Пользователи
      </Nav.Link>

      <Nav.Link
        onClick={() => {
          navigate("viewReports");
        }}
      >
        Отчеты
      </Nav.Link>

      <Nav.Link
        onClick={() => {
          navigate("courseRequests");
        }}
      >
        Заявки на курсы
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          navigate("refunds");
        }}
      >
        Возврат
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          navigate("promotion");
        }}
      >
        Скидки
      </Nav.Link>
    </>
  );
}
