import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function EditProfilePopover() {
  const navigate = useNavigate();
  const type = useSelector((state) => state.userReducer.type);

  return (
    <Button
      className="fitWidth"
      onClick={() => {
        if (type === "Instructor") {
          navigate("/instructor/editProfile");
        } else if (type === "Trainee") {
          navigate("/trainee/editProfile");
        } else if (type === "CorporateTrainee") {
          navigate("/corporateTrainee/editProfile");
        } else if (type === "Administrator") {
          navigate("/admin/editProfile");
        }
      }}
    >
      Редактировать профиль
    </Button>
  );
}
