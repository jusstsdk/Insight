import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import api from "../../functions/api";

export default function ForgotPassword() {
	const username = useRef();

	async function requestForgotPassword(e) {
		e.preventDefault();

		api.post("users/forgotPassword", { username: username.current.value });
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
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Button variant="primary" type="submit">
					Request a password reset
				</Button>
			</Form>
		</>
	);
}
