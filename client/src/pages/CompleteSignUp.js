import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import CountryDropdown from "../components/shared/CountryDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import updateCurrency from "../functions/updateCurrency";
import { login, setUser } from "../redux/userSlice";
import { Col, Container, Modal, Row, Spinner } from "react-bootstrap";

export default function CompleteSignUp() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const userType = useSelector((state) => state.userReducer.type);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.email || userType == "Guest") {
      navigate("/");
    }
  }, []);

  const password = useRef();
  const email = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const biography = useRef();
  const [country, setCountry] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const token = useSelector((state) => state.userReducer.token);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const handleCloseTermsModal = () => setShowTermsModal(false);
  const handleShowTermsModal = () => setShowTermsModal(true);

  async function handleFinishSignUp(e) {
    e.preventDefault();
    console.log(email);
    setIsLoggingIn(true);
    const config = {
      method: "PUT",
      url: `http://localhost:4000/api/${userType}s/${user._id}`,
      headers: { authorization: "Bearer " + token },
      data: {
        password: password.current.value,
        email: email.current.value,
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        country: country,
        biography: biography.current.value,
      },
    };
    try {
      const response = await axios(config);
      const responseToken = response.data["x-auth-token"];
      const responseUserType = response.data["userType"];

      let responseUser = response.data["user"];
      console.log(response);
      responseUser = await updateCurrency(responseUser);

      dispatch(
        login({
          type: responseUserType,
          token: responseToken,
          user: responseUser,
        }),
      );

      navigate("/");
    } catch (err) {
      setIsLoggingIn(false);
      console.log(err);
    }
  }
  return (
    <div>
      <h1 className="fst-italic mx-auto fitWidth">Заполните свои данные</h1>
      <Form onSubmit={handleFinishSignUp}>
        <Row sm={8} className="justify-content-center">
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label className="fst-italic">Пароль</Form.Label>
              <Form.Control
                ref={password}
                type="password"
                placeholder="Введите пароль"
                required
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label className="fst-italic">Почта</Form.Label>
              <Form.Control
                ref={email}
                type="email"
                placeholder="Введите почту"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row sm={8} className="justify-content-center">
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label className="fst-italic">Имя</Form.Label>
              <Form.Control
                ref={firstName}
                type="firstName"
                placeholder="Введите имя"
                required
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label className="fst-italic">Фамилия</Form.Label>
              <Form.Control
                ref={lastName}
                type="lastName"
                placeholder="Введите фамилию"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row sm={8} className="justify-content-center">
          <Col sm={4}>
            <Form.Label className="fst-italic"> Страна </Form.Label>
            <CountryDropdown
              Country={country}
              setCountry={setCountry}
              required={true}
            />
          </Col>
        </Row>
        <Row sm={8} className="justify-content-center mt-2">
          <Col sm={8}>
            <Form.Group
              className={userType == "CorporateTrainee" ? "d-none" : ""}
            >
              <Form.Label>Биография</Form.Label>
              <Form.Control
                ref={biography}
                placeholder="Введите биографию"
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row sm={8} className="mt-3 ">
          <Form.Group>
            <Container className="d-flex justify-content-center">
              <Form.Check
                className="my-auto"
                type="checkbox"
                label="Я согласен с"
                required
              />
              <Button variant="link" onClick={handleShowTermsModal}>
                правилами и условиями
              </Button>
            </Container>
          </Form.Group>
        </Row>
        <Col sm={2} className="d-flex flex-column mx-auto mt-2">
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
              Загрузка...
            </Button>
          ) : (
            <Button
              className=""
              variant="primary"
              type="submit"
              disabled={isLoggingIn}
            >
              Зарегистрироваться
            </Button>
          )}
        </Col>
      </Form>
      <Modal show={showTermsModal} onHide={handleCloseTermsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Правила и условия</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>В качестве инструктора:</h5>
          <p className="text-muted">
            Вы отказываетесь от всех прав на весь контент, видео, упражнения,
            электронные письма, рекламу. В денежном отношении мы будем брать 90%
            от всех денег, выплаченных на нашей платформе.
          </p>
          <h5>В качестве стажера:</h5>
          <p className="text-muted">
            Вы разрешаете нам собирать и продавать данные о вас, включая ваше
            имя, электронную почту, номер кредитной карты.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTermsModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
