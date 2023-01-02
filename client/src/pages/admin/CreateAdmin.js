import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { addNotification } from "../../redux/notificationsSlice";
import { useNavigate } from "react-router-dom";
function CreateAdmin() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const token = useSelector((state) => state.userReducer.token);
	const Username = useRef();
	const Password = useRef();

	const handleCreateAdmin = async (e) => {
		e.preventDefault();
		const config = {
			method: "POST",
			url: "http://localhost:4000/api/administrators",
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
					title: "Admin Created SuccessFully",
					info: "Send the entered Username and Password to them to Login",
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
	};
	return (
		<div>
			<h1 className="fst-italic mx-auto fitWidth">Create an Admin</h1>
			<Form className="d-flex flex-column justify-content-center" onSubmit={handleCreateAdmin}>
				<Row className=" justify-content-center">
					<Col sm={4} className="">
						<Form.Group className="mb-3">
							<Form.Label className="fst-italic">Username</Form.Label>
							<Form.Control ref={Username} type="Username" placeholder="Enter Username" required />
						</Form.Group>
					</Col>
				</Row>
				<Row className=" justify-content-center">
					<Col sm={4}>
						<Form.Group className="mb-3">
							<Form.Label className="fst-italic">Password</Form.Label>
							<Form.Control ref={Password} type="password" placeholder="Enter Password" required />
						</Form.Group>
					</Col>
				</Row>
				<Row className="justify-content-center">
					<Col sm={2} className="d-flex justify-content-center">
						<Button className="w-100" variant="primary" type="submit">
							Add Administrator
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
}
export default CreateAdmin;
