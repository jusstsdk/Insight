import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useSelector } from "react-redux";
function CreateAdmin() {
	const token = useSelector((state) => state.userReducer.token);
	const Username = useRef();
	const Password = useRef();

	const handleCreateAdmin = async () => {
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
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div>
			<h1> create an admin </h1>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
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
				<Button
					onClick={(e) => {
						e.preventDefault();
						handleCreateAdmin();
					}}
					variant="primary"
					type="submit"
				>
					Add Administrator
				</Button>
			</Form>
		</div>
	);
}
export default CreateAdmin;
