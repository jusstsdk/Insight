import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Button } from "react-bootstrap";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const oldPassword = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const token = useSelector((state) => state.userReducer.token);
  const [error, setError] = useState(false);
  const MySwal = withReactContent(Swal);

  const [passwordValidation, setPasswordValidation] = useState(null);

  const handleChangePassword = async () => {
    try {
      if (password.current.value !== confirmPassword.current.value) {
        setError(true);
        return;
      } else {
        setError(false);
      }

      if (password.current.value.length < 8) {
        setPasswordValidation("Password must contains at least 8 characters");
        return;
      } else {
        setPasswordValidation(null);
      }

      const config = {
        method: "POST",
        url: "http://localhost:4000/api/users/resetPassword",
        headers: { authorization: "Bearer " + token },
        data: { password: password.current.value, oldPassword: oldPassword.current.value },
      };

      await axios(config);

      MySwal.fire({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 4000,
        title: <strong>Изменить пароль</strong>,
        html: <i>Пароль успешно изменен!</i>,
        icon: "success",
        timerProgressBar: true,
        grow: "row",
      });
      setError(false);
      navigate("../");
    } catch (err) {
      if (err.response.data.error) {
        MySwal.fire({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 4000,
          title: <strong>Изменить пароль</strong>,
          html: <i>Старый пароль неверный!</i>,
          icon: "error",
          timerProgressBar: true,
          grow: "row",
        })
      } else {
        MySwal.fire({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 4000,
          title: <strong>Изменить пароль</strong>,
          html: <i>Произошла ошибка!</i>,
          icon: "error",
          timerProgressBar: true,
          grow: "row",
        })
      };
    }
  };
  return (
    <Form className="d-flex flex-row justify-content-center mt-3">
      <Col sm={6}>
        <h1 className="display-5">Изменить пароль</h1>
        <Form.Group className="mb-3">
          <Form.Label>Введите старый пароль</Form.Label>
          <Form.Control type="password" ref={oldPassword} placeholder="Старый пароль" />
          <Form.Label>Введите новый пароль</Form.Label>
          <Form.Control type="password" ref={password} placeholder="Новый пароль" />
          <Form.Label>Подтвердите пароль</Form.Label>
          <Form.Control
            type="password"
            ref={confirmPassword}
            placeholder="Подтвердите пароль"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleChangePassword}>
          Сохранить
        </Button>
        {error && (
          <p className="text-danger mb-0 mt-2">Passwords don't match!</p>
        )}{" "}
        {passwordValidation && (
          <p className="text-danger mt-2">{passwordValidation}</p>
        )}
      </Col>
    </Form>
  );
}
export default ChangePassword;
