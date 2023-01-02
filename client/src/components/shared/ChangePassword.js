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

	const password = useRef();
	const confirmPassword = useRef();
	const token = useSelector((state) => state.userReducer.token);
	const [error, setError] = useState(false);
	const MySwal = withReactContent(Swal);

	const handleChangePassword = async () => {
		try {
			if (password.current.value !== confirmPassword.current.value) {
				setError(true);
				return;
			}
			const config = {
				method: "POST",
				url: "http://localhost:4000/api/users/resetPassword",
				headers: { authorization: "Bearer " + token },
				data: { password: password.current.value },
			};

			await axios(config);

			MySwal.fire({
				toast: true,
				position: "bottom-end",
				showConfirmButton: false,
				timer: 4000,
				title: <strong>Change password</strong>,
				html: <i>Changed password Successfully!</i>,
				icon: "success",
				timerProgressBar: true,
				grow: "row",
			});
			setError(false);
			navigate("../");
		} catch (err) {
			MySwal.fire({
				toast: true,
				position: "bottom-end",
				showConfirmButton: false,
				timer: 4000,
				title: <strong>Change password</strong>,
				html: <i>Changing password Failed!</i>,
				icon: "error",
				timerProgressBar: true,
				grow: "row",
			});
		}
	};
	return (
		<Form className="d-flex flex-row justify-content-center mt-3">
			<Col sm={6}>
				<h1 className="display-5">Change Password</h1>
				<Form.Group className="mb-3">
					<Form.Label>Enter new password</Form.Label>
					<Form.Control type="password" ref={password} placeholder="password" />
					<Form.Label>Confirm password</Form.Label>
					<Form.Control type="password" ref={confirmPassword} placeholder="Confirm Password" />
				</Form.Group>
				<Button variant="primary" onClick={handleChangePassword}>
					Submit
				</Button>
				{error && <p className="text-danger">Passwords don't match!</p>}
			</Col>
		</Form>
	);
}
export default ChangePassword;
