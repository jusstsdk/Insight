import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import axios from "axios";
import { useRef, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addNotification } from "../../redux/notificationsSlice";
import updateCurrency from "../../functions/updateCurrency";

export default function Login() {
	const username = useRef();
	const password = useRef();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	async function loginFunction(e) {
		e.preventDefault();
		setIsLoggingIn(true);

		const config = {
			method: "POST",
			url: "http://localhost:4000/api/users/login",
			headers: {},
			data: {
				username: username.current.value,
				password: password.current.value,
			},
		};
		try {
			const response = await axios(config);
			const responseToken = response.data["x-auth-token"];
			const responseUserType = response.data["userType"];

			let responseUser = response.data["user"];
			responseUser = await updateCurrency(responseUser);

			dispatch(
				login({
					type: responseUserType,
					token: responseToken,
					user: responseUser,
				})
			);

			switch (responseUserType) {
				case "Administrator":
					navigate("/admin");
					break;
				case "Instructor":
					navigate("/instructor");
					break;
				case "Trainee":
					navigate("/trainee");
					break;
				case "CorporateTrainee":
					navigate("/corporateTrainee");
					break;
			}
		} catch (error) {
			dispatch(
				addNotification({
					title: "Wrong Credentials",
					info: "Your password or username is wrong try again please",
					color: "error",
				})
			);
			setIsLoggingIn(false);
		}
	}

	return (
		<Form className="d-flex flex-column mb-2" onSubmit={!isLoggingIn ? loginFunction : null}>
			<Form.Group className="mb-2" controlId="formBasicUsername">
				<Form.Label className="fs-6">Username</Form.Label>
				<Form.Control type="text" placeholder="Enter username" ref={username} />
			</Form.Group>

			<Form.Group className="mb-2" controlId="formBasicPassword">
				<Form.Label className="fs-6">Password</Form.Label>
				<Form.Control type="password" placeholder="Password" ref={password} />
			</Form.Group>

			{isLoggingIn ? (
				<Button variant="primary" disabled>
					<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />{" "}
					Logging in...
				</Button>
			) : (
				<Button className="" variant="primary" type="submit" disabled={isLoggingIn}>
					Login
				</Button>
			)}
		</Form>
	);
}
