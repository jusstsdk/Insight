import { Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function GuestNavbarButtons() {
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
    </>
  );
}
