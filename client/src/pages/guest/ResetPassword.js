import axios from "axios";
import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

export default function ResetPassword() {
	const password = useRef();
	let [searchParams] = useSearchParams();

	async function requestPasswordReset(e) {
		e.preventDefault();

		const config = {
			method: "POST",
			url: "http://localhost:4000/api/users/resetPassword",
			headers: { authorization: "Bearer " + searchParams.get("jwt") },
			data: { password: password.current.value },
		};

		const response = await axios(config);
	}

	return (
		<>
			<Form onSubmit={requestPasswordReset}>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>New Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						ref={password}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Change Password
				</Button>
			</Form>
		</>
	);
}
