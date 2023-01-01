import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import CountryDropdown from "../components/shared/CountryDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import updateCurrency from "../functions/updateCurrency";
import { setUser } from "../redux/userSlice";

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

	async function handleFinishSignUp(e) {
		e.preventDefault();
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
			let response = await axios(config);
			let user = response.data;
			user = await updateCurrency(user);
			dispatch(setUser(user));
			navigate("/");
		} catch (err) {
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
					onChange={(e) => {
						setGender(e.target.value);
					}}
					aria-label="Default select example"
					required
				>
					<option>Select Gender</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
				</Form.Select>
				<CountryDropdown Country={country} setCountry={setCountry} />
				<Form.Group>
					<Form.Check
						type="checkbox"
						label="I agree to the terms and conditions"
						required
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Finish sign Up
				</Button>
			</Form>
		</div>
	);
}
