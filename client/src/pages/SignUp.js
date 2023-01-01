import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import CountryDropdown from "../components/shared/CountryDropdown";
import { Col, Row } from "react-bootstrap";
import { addNotification } from "../redux/notificationsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const Username = useRef();
	const Password = useRef();
	const Email = useRef();
	const FirstName = useRef();
	const LastName = useRef();
	const [Gender, setGender] = useState("");
	const [Country, setCountry] = useState("");
	const handleCreateTrainee = async () => {
		const config = {
			method: "POST",
			url: "http://localhost:4000/api/trainees/",
			data: {
				username: Username.current.value,
				password: Password.current.value,
				email: Email.current.value,
				firstName: FirstName.current.value,
				lastName: LastName.current.value,
				gender: Gender,
				country: Country,
				wallet: 0,
			},
		};
		try {
			await axios(config);
			dispatch(
				addNotification({
					title: "Signed up SuccessFully",
					info: "Account Created SuccessFully, Have fun!",
					color: "success",
				})
			);
			// navigate("/");
		} catch (err) {
			console.log(err);
			dispatch(
				addNotification({
					title: "Something Went Wrong",
					info: "Try again another time please",
					color: "error",
				})
			);
		}
	};
	return (
		<div>
			<h1 className="fst-italic mx-auto fitWidth">Sign Up</h1>
			<Form>
				<Row sm={8} className="justify-content-center">
					<Col sm={4}>
						<Form.Group className="mb-3" controlId="formBasicFirstName">
							<Form.Label className="fst-italic">First name</Form.Label>
							<Form.Control ref={FirstName} type="firstName" placeholder="Enter First Name" />
						</Form.Group>
					</Col>
					<Col sm={4}>
						<Form.Group className="mb-3" controlId="formBasicLastName">
							<Form.Label className="fst-italic"> Last name </Form.Label>
							<Form.Control ref={LastName} type="lastName" placeholder="Enter Last Name" />
						</Form.Group>
					</Col>
				</Row>
				<Row sm={8} className="justify-content-center">
					<Col sm={4}>
						<Form.Group className="mb-3" controlId="formBasicUsername">
							<Form.Label className="fst-italic">Username</Form.Label>
							<Form.Control ref={Username} type="Username" placeholder="Enter Username" />
						</Form.Group>
					</Col>
					<Col sm={4}>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label className="fst-italic">Password</Form.Label>
							<Form.Control ref={Password} type="password" placeholder="Enter Password" />
						</Form.Group>
					</Col>
				</Row>
				<Row sm={8} className="justify-content-center">
					<Col sm={8}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label className="fst-italic">Email</Form.Label>
							<Form.Control ref={Email} type="email" placeholder="Enter Email" />
						</Form.Group>
					</Col>
				</Row>
				<Row sm={8} className="justify-content-center">
					<Col sm={4}>
						<Form.Label className="fst-italic">Select Country </Form.Label>
						<Form.Select
							onChange={(e) => {
								setGender(e.target.value);
							}}
							aria-label="Default select example">
							<option className="fst-italic">Select Gender</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</Form.Select>
					</Col>
					<Col sm={4}>
						<Form.Label className="fst-italic">Select Country </Form.Label>
						<CountryDropdown Country={Country} setCountry={setCountry} />
					</Col>
				</Row>
				<Row className="justify-content-center mt-3">
					<Col sm={2} className="d-flex justify-content-center">
						<Button
							onClick={(e) => {
								e.preventDefault();
								handleCreateTrainee();
							}}
							className="w-100"
							variant="primary"
							type="submit">
							Sign Up
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
}
