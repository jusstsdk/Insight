import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import axios from "axios";
import { useRef, useState } from "react";
import { Form, Button, Spinner, Row, Container, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import updateCurrency from "../../functions/updateCurrency";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Login() {
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [usernameValidation, setUsernameValidation] = useState(null);
  const [passwordValidation, setPasswordValidation] = useState(null);

  async function loginFunction(e) {
    e.preventDefault();

    if (!username.current.value.match(/^[a-zA-Z0-9]+$/)) {
      setUsernameValidation("Username can only contain letters and numbers");
    } else {
      setUsernameValidation(null);
    }

    if (password.current.value.length < 8) {
      setPasswordValidation("Password must contains at least 8 characters");
    } else {
      setPasswordValidation(null);
    }

    if (
      !username.current.value.match(/^[a-zA-Z0-9]+$/) ||
      password.current.value.length < 8
    ) {
      return;
    }

    setIsLoggingIn(true);

    const config = {
      method: "POST",
      url: "http://localhost:4000/api/users/login",
      headers: {},
      data: {
        username: username.current.value,
        password: password.current.value,
      },
    };
    try {
      const response = await axios(config);
      const responseToken = response.data["x-auth-token"];
      const responseUserType = response.data["userType"];

      let responseUser = response.data["user"];
      responseUser = await updateCurrency(responseUser);

      dispatch(
        login({
          type: responseUserType,
          token: responseToken,
          user: responseUser,
        }),
      );

      navigate("/");
    } catch (error) {
      console.log(error);

      MySwal.fire({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 4000,
        title: <strong>Wrong Credentials</strong>,
        html: <i>Your password or username is wrong try again please</i>,
        icon: "error",
        timerProgressBar: true,
        grow: "row",
      });
      setIsLoggingIn(false);
    }
  }

  return (
    <Form
      className="d-flex flex-column mb-2"
      onSubmit={!isLoggingIn ? loginFunction : null}
    >
      <Form.Group className="mb-2">
        <Form.Label className="fs-6">Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" ref={username} />
        {usernameValidation && <Form.Text>{usernameValidation}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label className="fs-6">Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={password} />
        {passwordValidation && <Form.Text>{passwordValidation}</Form.Text>}
      </Form.Group>

      {isLoggingIn ? (
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-1"
          />
          Logging in...
        </Button>
      ) : (
        <Button
          className=""
          variant="primary"
          type="submit"
          disabled={isLoggingIn}
        >
          Login
        </Button>
      )}
    </Form>
  );
}
