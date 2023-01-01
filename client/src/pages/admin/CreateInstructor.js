import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import CountryDropdown from "../../components/shared/CountryDropdown";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../redux/notificationsSlice";

function CreateInstructor() {
	const token = useSelector((state) => state.userReducer.token);
	const Username = useRef();
	const Password = useRef();
	const dispatch = useDispatch();

	async function handleCreateInstructor(e) {
		e.preventDefault();
		const config = {
			method: "POST",
			url: "http://localhost:4000/api/instructors/",
			headers: { authorization: "Bearer " + token },
			data: {
				username: Username.current.value,
				password: Password.current.value,
			},
		};
		try {
			let response = await axios(config);
			addNotification({
				title: "Instructor Created Success Fully",
				info: "Send the entered username and password to them to login",
				color: "success",
			});
		} catch (err) {
			console.log(err);
			addNotification({
				title: "Something Went Wrong",
				info: "Try again another time please",
				color: "error",
			});
		}
	}
	return (
		<div>
			<h1> create an instructor </h1>
			<Form onSubmit={handleCreateInstructor}>
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
					<Form.Control
						ref={Password}
						type="password"
						placeholder="Password"
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Add Instructor
				</Button>
			</Form>
		</div>
	);
}
export default CreateInstructor;
