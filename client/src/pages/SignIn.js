import Login from "../components/shared/Login";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="fst-italic mx-auto fitWidth">Login</h1>

      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Login />

          <Col className="d-flex justify-content-between">
            <Button
              className="fitWidth"
              variant="link"
              onClick={() => {
                navigate("/guest/signUp");
              }}
            >
              Sign Up
            </Button>

            <Button
              className="fitWidth"
              variant="link"
              onClick={() => {
                navigate("/guest/forgotPassword");
              }}
            >
              Forgot password?
            </Button>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
