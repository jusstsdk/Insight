import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import SelectCountry from "../SelectCountry";

function CreateInstructor() {
	const token = localStorage.getItem("token");
	const Username = useRef();
	const Password = useRef();
	const Email = useRef();
	const Biography = useRef();
	const [Country, setCountry] = useState("");
	const handleCreateInstructor = async () => {
		const config = {
			method: "POST",
			url: "http://localhost:4000/api/instructors/",
			headers: { authorization: "Bearer " + token },
			data: {
				username: Username.current.value,
				password: Password.current.value,
				email: Email.current.value,
				biography: Biography.current.value,
				country: Country,
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
			<h1> create an instructor </h1>
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
				<Form.Group className="mb-3" controlId="ControlTextareaBiography">
					<Form.Label> Biography </Form.Label>
					<Form.Control
						ref={Biography}
						placeholder="Enter Biography"
						as="textarea"
						rows={3}
					/>
				</Form.Group>
				<SelectCountry Country={Country} setCountry={setCountry} />
				<Button
					onClick={(e) => {
						e.preventDefault();
						handleCreateInstructor();
					}}
					variant="primary"
					type="submit"
				>
					Add Instructor
				</Button>
			</Form>
		</div>
	);
}
export default CreateInstructor;
