import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useSelector } from "react-redux";

function CreateCorporateTrainee() {
	const token = useSelector((state) => state.userReducer.token);
	const Username = useRef();
	const Password = useRef();
	const corporate = useRef();
	async function handleCreateCorporateTrainee(e) {
		e.preventDefault();
		const config = {
			method: "POST",
			url: "http://localhost:4000/api/corporateTrainees/",
			headers: { authorization: "Bearer " + token },
			data: {
				username: Username.current.value,
				password: Password.current.value,
				country: "USA",
				corporate: corporate.current.value,
			},
		};
		try {
			let response = await axios(config);
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<div>
			<h1> Create Corporate Trainee </h1>
			<Form onSubmit={handleCreateCorporateTrainee}>
				<Form.Group className="mb-3">
					<Form.Label> Username </Form.Label>
					<Form.Control ref={Username} placeholder="Enter Username" required />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						ref={Password}
						type="password"
						placeholder="Password"
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Corporate Name</Form.Label>
					<Form.Control ref={corporate} placeholder="Corporate Name" required />
				</Form.Group>

				<Button variant="primary" type="submit">
					Add Corporate Trainee
				</Button>
			</Form>
		</div>
	);
}
export default CreateCorporateTrainee;
