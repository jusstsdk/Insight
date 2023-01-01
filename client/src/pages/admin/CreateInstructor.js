import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import CountryDropdown from "../../components/shared/CountryDropdown";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../redux/notificationsSlice";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CreateInstructor() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const token = useSelector((state) => state.userReducer.token);
	const Username = useRef();
	const Password = useRef();
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
			await axios(config);
			dispatch(
				addNotification({
					title: "Instructor Created SuccessFully",
					info: "Send the entered username and password to them to login",
					color: "success",
				})
			);
			navigate("/");
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
	}
	return (
		<div>
			<h1 className="fst-italic mx-auto fitWidth">Create an Instructor</h1>
			<Form className="d-flex flex-column justify-content-center" onSubmit={handleCreateInstructor}>
				<Row className=" justify-content-center">
					<Col sm={4}>
						<Form.Group className="mb-3" controlId="formBasicUsername">
							<Form.Label className="fst-italic"> Username </Form.Label>
							<Form.Control ref={Username} type="Username" placeholder="Enter Username" required />
						</Form.Group>
					</Col>
				</Row>
				<Row className=" justify-content-center">
					<Col sm={4}>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label className="fst-italic">Password</Form.Label>
							<Form.Control ref={Password} type="password" placeholder="Password" required />
						</Form.Group>
					</Col>
				</Row>
				<Row className="justify-content-center">
					<Col sm={2} className="d-flex justify-content-center">
						<Button className="w-100" variant="primary" type="submit">
							Add Instructor
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
}
export default CreateInstructor;
