import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import api from "../../functions/api";
import { addNotification } from "../../redux/notificationsSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ForgotPassword() {
	const username = useRef();
	const dispatch = useDispatch();
	const MySwal = withReactContent(Swal);
	async function requestForgotPassword(e) {
		e.preventDefault();
		try {
			api.post("users/forgotPassword", {
				username: username.current.value,
			});
			
			MySwal.fire({
				toast: true,
				position: 'bottom-end',
				showConfirmButton: false,
				timer: 4000,
				title: <strong>Request Sent</strong>,
				html: <i>if the username you entered is correct you will get a message on the attached email to reset your password</i>,
				icon: "success",
				timerProgressBar: true,
				grow:'row'
			});
		} catch (error) {
			
			MySwal.fire({
				toast: true,
				position: 'bottom-end',
				showConfirmButton: false,
				timer: 4000,
				title: <strong>Something Went Wrong</strong>,
				html: <i>Please try again later</i>,
				icon: "error",
				timerProgressBar: true,
				grow:'row'
			});
		}
	}

	return (
		<>
			<Form onSubmit={requestForgotPassword}>
				<Form.Group className="mb-3">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter username"
						ref={username}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Request a password reset
				</Button>
			</Form>
		</>
	);
}
