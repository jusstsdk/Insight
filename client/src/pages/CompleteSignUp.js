import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import CountryDropdown from "../components/shared/CountryDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import updateCurrency from "../functions/updateCurrency";
import { login, setUser } from "../redux/userSlice";
import { Col, Container, Modal, Row, Spinner } from "react-bootstrap";

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

	const [showTermsModal, setShowTermsModal] = useState(false);
	const handleCloseTermsModal = () => setShowTermsModal(false);
	const handleShowTermsModal = () => setShowTermsModal(true);

	async function handleFinishSignUp(e) {
		e.preventDefault();
		console.log(email);
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
			<h1 className="fst-italic mx-auto fitWidth">Fill in your details</h1>
			<Form onSubmit={handleFinishSignUp}>
				<Row sm={8} className="justify-content-center">
					<Col sm={4}>
						<Form.Group className="mb-3">
							<Form.Label className="fst-italic">Password</Form.Label>
							<Form.Control ref={password} type="password" placeholder="Password" required />
						</Form.Group>
					</Col>
					<Col sm={4}>
						<Form.Group className="mb-3">
							<Form.Label className="fst-italic">Email</Form.Label>
							<Form.Control ref={email} type="email" placeholder="Enter Email" required />
						</Form.Group>
					</Col>
				</Row>
				<Row sm={8} className="justify-content-center">
					<Col sm={4}>
						<Form.Group className="mb-3">
							<Form.Label className="fst-italic">First name</Form.Label>
							<Form.Control
								ref={firstName}
								type="firstName"
								placeholder="Enter firstName"
								required
							/>
						</Form.Group>
					</Col>
					<Col sm={4}>
						<Form.Group className="mb-3">
							<Form.Label className="fst-italic">Last name</Form.Label>
							<Form.Control ref={lastName} type="lastName" placeholder="Enter lastName" required />
						</Form.Group>
					</Col>
				</Row>
				<Row sm={8} className="justify-content-center">
					<Col sm={4}>
						<Form.Label className="fst-italic"> Gender </Form.Label>
						<Form.Select
							value={gender}
							onChange={(e) => {
								setGender(e.target.value);
							}}
							aria-label="Default select example"
							required="true">
							<option value="" className="fst-italic">
								Select Gender
							</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</Form.Select>
					</Col>
					<Col sm={4}>
						<Form.Label className="fst-italic"> Country </Form.Label>
						<CountryDropdown Country={country} setCountry={setCountry} required={true} />
					</Col>
				</Row>
				<Row sm={8} className="justify-content-center mt-2">
					<Col sm={8}>
						<Form.Group className={userType == "CorporateTrainee" ? "d-none" : ""}>
							<Form.Label> Biography </Form.Label>
							<Form.Control ref={biography} placeholder="Enter Biography" as="textarea" rows={3} />
						</Form.Group>
					</Col>
				</Row>
				<Row sm={8} className="mt-3 ">
					<Form.Group>
						<Container className="d-flex justify-content-center">
							<Form.Check className="my-auto" type="checkbox" label="I agree to the" required />
							<Button variant="link" onClick={handleShowTermsModal}>
								terms and conditions
							</Button>
						</Container>
					</Form.Group>
				</Row>
				<Col sm={2} className="d-flex flex-column mx-auto mt-2">
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
						<Button className="" variant="primary" type="submit" disabled={isLoggingIn}>
							Sign Up
						</Button>
					)}
				</Col>
			</Form>
			<Modal show={showTermsModal} onHide={handleCloseTermsModal}>
				<Modal.Header closeButton>
					<Modal.Title>Terms And Conditions</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h5>As an Instructor:</h5>
					<p className="text-muted">
						You give up all rights to all content, videos, exercises, emails, ads. Money wise we
						will take 90% of all money paid on our platform.
					</p>
					<h5>As an Coporate Trainee:</h5>
					<p className="text-muted">
						You will be beholden to your companies policies and what they allow you to subscribe to.
					</p>
					<h5>As a Trainee:</h5>
					<p className="text-muted">
						You allow us to take collect and sell data about you, including your name,email,credit
						card number.
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseTermsModal}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
