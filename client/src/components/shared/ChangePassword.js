import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Button } from "react-bootstrap";

import { addNotification } from "../../redux/notificationsSlice";
import axios from "axios";

function ChangePassword() {
	const dispatch = useDispatch();
	const password = useRef();
	const confirmPassword = useRef();
	const token = useSelector((state) => state.userReducer.token);
	const [error, setError] = useState(false);

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

			dispatch(
				addNotification({
					title: "Change password",
					info: "Changed password Successfully!",
					color: "success",
				})
			);
			setError(false);
		} catch (err) {
			dispatch(
				addNotification({
					title: "Change password",
					info: "Changing password Failed!",
					color: "error",
				})
			);
		}
	};
	return (
		<Form className="d-flex flex-row justify-content-center mt-3">
			<Col sm={6}>
				<h1 className="display-5">Edit Profile</h1>
				<Form.Group className="mb-3">
					<Form.Label>Enter new password</Form.Label>
					<Form.Control type="password" ref={password} placeholder="password" />
					<Form.Label>Confirm password</Form.Label>
					<Form.Control
						type="password"
						ref={confirmPassword}
						placeholder="Confirm Password"
					/>
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
