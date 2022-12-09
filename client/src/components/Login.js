import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import axios from "axios";
import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const username = useRef();
	const password = useRef();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	async function loginFunction(e) {
		e.preventDefault();

		const config = {
			method: "POST",
			url: "http://localhost:4000/api/users/login",
			headers: {},
			data: {
				username: username.current.value,
				password: password.current.value,
			},
		};

		const response = await axios(config);
		const responseToken = response.data["x-auth-token"];
		const responseUserType = response.data["userType"];
		const responseUser = response.data["user"];

		dispatch(
			login({
				type: responseUserType,
				token: responseToken,
				user: responseUser,
			})
		);

		switch (responseUserType) {
			case "admin":
				navigate("/admin");
				break;
			case "instructor":
				navigate("/instructor");
				break;
			case "trainee":
				navigate("/trainee");
				break;
			case "corporateTrainee":
				navigate("/corporateTrainee");
				break;
		}
	}

	return (
		<>
			<Form onSubmit={loginFunction}>
				<Form.Group className="mb-3" controlId="formBasicUsername">
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

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						ref={password}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</>
	);
}