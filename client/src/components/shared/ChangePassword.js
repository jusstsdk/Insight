import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Button } from "react-bootstrap";

import { addNotification } from "../../redux/notificationsSlice";
import axios from "axios";

function ChangePassword() {
	const dispatch = useDispatch();
	const password = useRef();
	const token = useSelector((state) => state.userReducer.token);

	const handleChangePassword = async () => {
		try {
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
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Enter new password</Form.Label>
					<Form.Control type="password" ref={password} placeholder="password" />
				</Form.Group>
				<Button variant="success" onClick={handleChangePassword}>
					Submit
				</Button>
			</Col>
		</Form>
	);
}
export default ChangePassword;
