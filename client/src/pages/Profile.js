import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import RoomIcon from "@mui/icons-material/Room";
import EditProfilePopover from "../components/shared/EditProfilePopover";
import ChangePasswordPopOver from "../components/shared/ChangePasswordPopOver";
import ProfilePopover from "../components/shared/ProfilePopover";
import { Container } from "@mui/material";

const Profile = () => {
  const user = useSelector((state) => state.userReducer.user);

  const formattedData = (data) => {
    const newData = new Date(data).toUTCString().split(" ");

    return `${newData[1]} ${newData[2]} ${newData[3]}`;
  };

  return (
    <Container maxWidth={"sm"}>
      <Row className={"d-flex"}>
        <Col
          sm={"auto"}
          className={"flex-grow-0 flex-shrink-0 flex-basis-auto w-auto"}
        >
          <h3 className={"fw-bold mb-2 fs-2"}>Привет, {user.username}</h3>
        </Col>

        <Col className={"d-flex justify-content-end"}>
          <p>
            <RoomIcon className={"mb-2"} />

            {user.country}
          </p>
        </Col>
      </Row>

      <p className={"mb-4 fs-4"}>{user.email}</p>

      <p className={"fs-4"}>
        Дата регистрации: {formattedData(user.createdAt)}
      </p>

      <div className="d-flex justify-content-start gap-3 mb-3">
        <EditProfilePopover />

        <ChangePasswordPopOver />
      </div>

      <ProfilePopover />
    </Container>
  );
};

export default Profile;
