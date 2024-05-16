import { Button, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { CgLogIn } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const userType = useSelector((state) => state.userReducer.type);
  const navigate = useNavigate();

  if (userType === "Guest")
    return (
      <>
        <Button onClick={() => navigate("/guest/login")}>
          <CgLogIn size={30} />
        </Button>
      </>
    );
  else
    return (
      <>
        <Nav.Link
          onClick={() => navigate("profile")}
          id="profileButton"
          className="secondaryText linkDecor"
        >
          Profile
        </Nav.Link>
      </>
    );
}
