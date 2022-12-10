import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import CountryDropdown from "../shared/CountryDropdown";

function CreateCorporateTrainee() {
	const token = localStorage.getItem("token");
	const Username = useRef();
	const Password = useRef();
	const Email = useRef();
	const FirstName = useRef();
	const LastName = useRef();
	const [Gender, setGender] = useState("");
	const [Country, setCountry] = useState("");
	const handleCreateCorporateTrainee = async () => {
		const config = {
			method: "POST",
			url: "http://localhost:4000/api/corprateTrainee/",
			headers: { authorization: "Bearer " + token },
			data: {
				username: Username.current.value,
				password: Password.current.value,
				email: Email.current.value,
				firstName: FirstName.current.value,
				lastName: LastName.current.value,
				gender: Gender,
				country: Country,
				corporate: null,
			},
		};
		try {
			let response = await axios(config);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div>
			<h1> create a Corporate Trainee </h1>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicUsername">
					<Form.Label> Username </Form.Label>
					<Form.Control
						ref={Username}
						type="Username"
						placeholder="Enter Username"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control ref={Password} type="password" placeholder="Password" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label> Email </Form.Label>
					<Form.Control ref={Email} type="email" placeholder="Enter Email" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicFirstName">
					<Form.Label> First name </Form.Label>
					<Form.Control
						ref={FirstName}
						type="firstName"
						placeholder="Enter firstName"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicLastName">
					<Form.Label> Last name </Form.Label>
					<Form.Control
						ref={LastName}
						type="lastName"
						placeholder="Enter lastName"
					/>
				</Form.Group>
				<Form.Select
					onChange={(e) => {
						setGender(e.target.value);
					}}
					aria-label="Default select example"
				>
					<option>Select Gender</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
				</Form.Select>
				<CountryDropdown Country={Country} setCountry={setCountry} />
				<Button
					onClick={(e) => {
						e.preventDefault();
						handleCreateCorporateTrainee();
					}}
					variant="primary"
					type="submit"
				>
					Add Corporate Trainee
				</Button>
			</Form>
		</div>
	);
}
export default CreateCorporateTrainee;
