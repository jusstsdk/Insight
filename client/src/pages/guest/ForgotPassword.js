import { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import api from "../../functions/api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ForgotPassword() {
  const username = useRef();
  const MySwal = withReactContent(Swal);

  const [usernameValidation, setUsernameValidation] = useState(null);

  async function requestForgotPassword(e) {
    e.preventDefault();

    if (!username.current.value.match(/^[a-zA-Z0-9]+$/)) {
      setUsernameValidation("Username can only contain letters and numbers");
      return;
    } else {
      setUsernameValidation(null);
    }

    try {
      api.post("users/forgotPassword", {
        username: username.current.value,
      });

      MySwal.fire({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 4000,
        title: <strong>Request Sent</strong>,
        html: (
          <i>
            if the username you entered is correct you will get a message on the
            attached email to reset your password
          </i>
        ),
        icon: "success",
        timerProgressBar: true,
        grow: "row",
      });
    } catch (error) {
      MySwal.fire({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 4000,
        title: <strong>Something Went Wrong</strong>,
        html: <i>Please try again later</i>,
        icon: "error",
        timerProgressBar: true,
        grow: "row",
      });
    }
  }

  return (
    <>
      <Form onSubmit={requestForgotPassword}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            ref={username}
          />
          {usernameValidation && <Form.Text>{usernameValidation}</Form.Text>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Request a password reset
        </Button>
      </Form>
    </>
  );
}
