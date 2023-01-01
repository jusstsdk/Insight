import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import CountryDropdown from "../components/shared/CountryDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import updateCurrency from "../functions/updateCurrency";
import { login, setUser } from "../redux/userSlice";
import { Spinner } from "react-bootstrap";

export default function CompleteSignUp() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userReducer.user);
	const userType = useSelector((state) => state.userReducer.type);
	const navigate = useNavigate();

	useEffect(() => {
		if (user.email || userType == "Guest") {
			navigate("/");
		}
	}, []);

	const password = useRef();
	const email = useRef();
	const firstName = useRef();
	const lastName = useRef();
	const biography = useRef();
	const [gender, setGender] = useState("");
	const [country, setCountry] = useState("");
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	async function handleFinishSignUp(e) {
		e.preventDefault();
		setIsLoggingIn(true);
		const config = {
			method: "PUT",
			url: `http://localhost:4000/api/${userType}s/${user._id}`,
			data: {
				password: password.current.value,
				email: email.current.value,
				firstName: firstName.current.value,
				lastName: lastName.current.value,
				gender: gender,
				country: country,
				biography: biography.current.value,
			},
		};
		try {
			const response = await axios(config);
			const responseToken = response.data["x-auth-token"];
			const responseUserType = response.data["userType"];

			let responseUser = response.data["user"];
			console.log(response);
			responseUser = await updateCurrency(responseUser);

			dispatch(
				login({
					type: responseUserType,
					token: responseToken,
					user: responseUser,
				})
			);

			navigate("/");
		} catch (err) {
			setIsLoggingIn(false);
			console.log(err);
		}
	}
	return (
		<div>
			<h1> Fill in your details </h1>
			<Form onSubmit={handleFinishSignUp}>
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						ref={password}
						type="password"
						placeholder="Password"
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Email</Form.Label>
					<Form.Control
						ref={email}
						type="email"
						placeholder="Enter Email"
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>First name</Form.Label>
					<Form.Control
						ref={firstName}
						type="firstName"
						placeholder="Enter firstName"
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Last name</Form.Label>
					<Form.Control
						ref={lastName}
						type="lastName"
						placeholder="Enter lastName"
						required
					/>
				</Form.Group>
				<Form.Group
					className={userType == "CorporateTrainee" ? "d-none" : ""}
				>
					<Form.Label> Biography </Form.Label>
					<Form.Control
						ref={biography}
						placeholder="Enter Biography"
						as="textarea"
						rows={3}
					/>
				</Form.Group>
				<Form.Select
					value={gender}
					onChange={(e) => {
						setGender(e.target.value);
					}}
					aria-label="Default select example"
					required="true"
				>
					<option value="" className="fst-italic">
						Select Gender
					</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
				</Form.Select>
				<CountryDropdown
					Country={country}
					setCountry={setCountry}
					required={true}
				/>
				<Form.Group>
					<Form.Check
						type="checkbox"
						label="I agree to the terms and conditions"
						required
					/>
				</Form.Group>
				{isLoggingIn ? (
					<Button variant="primary" disabled>
						<Spinner
							as="span"
							animation="border"
							size="sm"
							role="status"
							aria-hidden="true"
							className="me-1"
						/>
						Sign Up...
					</Button>
				) : (
					<Button
						className=""
						variant="primary"
						type="submit"
						disabled={isLoggingIn}
					>
						Sign Up
					</Button>
				)}
			</Form>
		</div>
	);
}
