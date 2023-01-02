import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import CountryDropdown from "../../components/shared/CountryDropdown";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../redux/notificationsSlice";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function CreateInstructor() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const MySwal = withReactContent(Swal);

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
			
			MySwal.fire({
				toast: true,
				position: 'bottom-end',
				showConfirmButton: false,
				timer: 4000,
				title: <strong>Instructor Created SuccessFully</strong>,
				html: <i>Send the entered username and password to them to login</i>,
				icon: "success",
				timerProgressBar: true,
				grow:'row'
			});
			navigate("/");
		} catch (err) {
			console.log(err);
			
			MySwal.fire({
				toast: true,
				position: 'bottom-end',
				showConfirmButton: false,
				timer: 4000,
				title: <strong>Something Went Wrong</strong>,
				html: <i>Try again another time please</i>,
				icon: "error",
				timerProgressBar: true,
				grow:'row'
			});
		}
	}
	return (
		<div>
			<h1 className="fst-italic mx-auto fitWidth">Create an Instructor</h1>
			<Form className="d-flex flex-column justify-content-center" onSubmit={handleCreateInstructor}>
				<Row className=" justify-content-center">
					<Col sm={4}>
						<Form.Group className="mb-3">
							<Form.Label className="fst-italic"> Username </Form.Label>
							<Form.Control ref={Username} type="Username" placeholder="Enter Username" required />
						</Form.Group>
					</Col>
				</Row>
				<Row className=" justify-content-center">
					<Col sm={4}>
						<Form.Group className="mb-3">
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
