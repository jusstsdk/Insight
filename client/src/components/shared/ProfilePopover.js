import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function ProfilePopover() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="outline-secondary fitWidth"
        onClick={() => {
          dispatch(logout());
          navigate("/guest");
        }}
      >
        Выйти
      </Button>
    </>
  );
}
