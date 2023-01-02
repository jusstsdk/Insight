import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import api from "../../functions/api";
import { addNotification } from "../../redux/notificationsSlice";

export default function ForgotPassword() {
	const username = useRef();
	const dispatch = useDispatch();

	async function requestForgotPassword(e) {
		e.preventDefault();
		try {
			api.post("users/forgotPassword", {
				username: username.current.value,
			});
			dispatch(
				addNotification({
					title: "Request Sent",
					info: "if the username you entered is correct you will get a message on the attached email to reset your password",
					color: "success",
				})
			);
		} catch (error) {
			dispatch(
				addNotification({
					title: "Something Went Wrong",
					info: "Please try again later",
					color: "error",
				})
			);
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
				</Form.Group>

				<Button variant="primary" type="submit">
					Request a password reset
				</Button>
			</Form>
		</>
	);
}
