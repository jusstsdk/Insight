import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import CountryDropdown from "../components/shared/CountryDropdown";
import { Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/userSlice";
import updateCurrency from "../functions/updateCurrency";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);

  const [showTermsModal, setShowTermsModal] = useState(false);
  const handleCloseTermsModal = () => setShowTermsModal(false);
  const handleShowTermsModal = () => setShowTermsModal(true);

  const username = useRef();
  const password = useRef();
  const email = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const [country, setCountry] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [usernameValidation, setUsernameValidation] = useState(null);
  const [passwordValidation, setPasswordValidation] = useState(null);
  const [emailValidation, setEmailValidation] = useState(null);
	const token = useSelector((state) => state.userReducer.token);
  async function handleCreateTrainee(e) {
    e.preventDefault();

    if (!username.current.value.match(/^[a-zA-Z0-9]+$/)) {
      setUsernameValidation("Username can only contain letters and numbers");
    } else {
      setUsernameValidation(null);
    }

    if (!email.current.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailValidation("Email must be in the correct format");
    } else {
      setEmailValidation(null);
    }

    if (password.current.value.length < 8) {
      setPasswordValidation("Password must contains at least 8 characters");
    } else {
      setPasswordValidation(null);
    }

    if (
      !username.current.value.match(/^[a-zA-Z0-9]+$/) ||
      password.current.value.length < 8 ||
      !email.current.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ) {
      return;
    }

    setIsLoggingIn(true);
    const config = {
      method: "POST",
      url: "http://localhost:4000/api/trainees/",				headers: { authorization: "Bearer " + token },
      data: {
        username: username.current.value,
        password: password.current.value,
        email: email.current.value,
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        country: country,
        wallet: 0,
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

      MySwal.fire({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 4000,
        title: <strong>Signed up SuccessFully</strong>,
        html: <i>Account Created SuccessFully, Have fun!</i>,
        icon: "success",
        timerProgressBar: true,
        grow: "row",
      });
    } catch (err) {
      let textMessage = <i>Try again another time please</i>;
      setIsLoggingIn(false);

      if (
        err.response.data.error === "User with this username already exists" ||
        err.response.data.error === "User with this email already exists"
      ) {
        textMessage = <i>{err.response.data.error}</i>;
      }

      MySwal.fire({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 4000,
        title: <strong>Something Went Wrong</strong>,
        html: textMessage,
        icon: "error",
        timerProgressBar: true,
        grow: "row",
      });
    }
  }
  return (
    <div>
      <h1 className="fst-italic mx-auto fitWidth">Sign Up</h1>
      <Form onSubmit={handleCreateTrainee}>
        <Row sm={8} className="justify-content-center">
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label className="fst-italic">First name</Form.Label>
              <Form.Control
                ref={firstName}
                type="firstName"
                placeholder="Enter First Name"
                required
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label className="fst-italic"> Last name </Form.Label>
              <Form.Control
                ref={lastName}
                type="lastName"
                placeholder="Enter Last Name"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row sm={8} className="justify-content-center">
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label className="fst-italic">Username</Form.Label>
              <Form.Control
                ref={username}
                type="Username"
                placeholder="Enter Username"
                required
              />
            </Form.Group>
            {usernameValidation && <Form.Text>{usernameValidation}</Form.Text>}
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label className="fst-italic">Password</Form.Label>
              <Form.Control
                ref={password}
                type="password"
                placeholder="Enter Password"
                required
              />
            </Form.Group>
            {passwordValidation && <Form.Text>{passwordValidation}</Form.Text>}
          </Col>
        </Row>
        <Row sm={8} className="justify-content-center">
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label className="fst-italic">Email</Form.Label>
              <Form.Control
                ref={email}
                type="email"
                placeholder="Enter Email"
                required
              />
            </Form.Group>
            {emailValidation && <Form.Text>{emailValidation}</Form.Text>}
          </Col>
          <Col sm={4}>
            <Form.Label className="fst-italic">Select Country </Form.Label>
            <CountryDropdown
              Country={country}
              setCountry={setCountry}
              required
            />
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col className="d-flex justify-content-center">
            <Form.Group>
              <Container className="d-flex">
                <Form.Check
                  className="my-auto"
                  type="checkbox"
                  label="I agree to the"
                  required
                />
                <Button variant="link" onClick={handleShowTermsModal}>
                  terms and conditions
                </Button>
              </Container>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col sm={2} className="d-flex justify-content-center">
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
                Sign Up...
              </Button>
            ) : (
              <Button
                className=""
                variant="primary"
                type="submit"
                disabled={isLoggingIn}
              >
                Sign Up
              </Button>
            )}
          </Col>
        </Row>
      </Form>
      <Modal show={showTermsModal} onHide={handleCloseTermsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Terms And Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>As an Instructor:</h5>
          <p className="text-muted">
            You give up all rights to all content, videos, exercises, emails,
            ads. Money wise we will take 90% of all money paid on our platform.
          </p>
          <h5>As an Coporate Trainee:</h5>
          <p className="text-muted">
            You will be beholden to your companies policies and what they allow
            you to subscribe to.
          </p>
          <h5>As a Trainee:</h5>
          <p className="text-muted">
            You allow us to take collect and sell data about you, including your
            name,email,credit card number.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTermsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
