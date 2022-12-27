import axios from "axios";
import { useRef,useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

export default function ResetPassword() {
	const password = useRef();
	const confirmPassword = useRef();
	const [error, setError] = useState(false);
	let [searchParams] = useSearchParams();

	async function requestPasswordReset(e) {
		e.preventDefault();
		if(password.current.value !== confirmPassword.current.value) {
			setError(true);
			return;
		}

		const config = {
			method: "POST",
			url: "http://localhost:4000/api/users/resetPassword",
			headers: { authorization: "Bearer " + searchParams.get("jwt") },
			data: { password: password.current.value },
		};

		const response = await axios(config);
		setError(false);
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
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm Password"
						ref={confirmPassword}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Change Password
				</Button>
				{error && <p className="text-danger">Passwords don't match!</p>}
			</Form>
		</>
	);
}
