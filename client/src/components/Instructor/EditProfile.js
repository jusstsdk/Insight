import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Row, Button } from "react-bootstrap";
import { setUser } from "../../redux/userSlice";
import { addNotification } from "../../redux/notificationsSlice";

function EditProfile() {
	const dispatch = useDispatch();
	const User = useSelector((state) => state.userReducer.user);
	const [Email, setEmail] = useState(useSelector((state) => state.userReducer.user.email));
	const [Biography, setBiography] = useState(
		useSelector((state) => state.userReducer.user.biography)
	);

	const handleEditProfile = async (e) => {
		e.preventDefault();

		const config = {
			method: "PUT",
			url: `http://localhost:4000/api/instructors/${User._id}`,
			headers: {},
			data: {
				email: Email,
				biography: Biography,
			},
		};
		try {
			await axios(config);
			let updatedUser = { ...User };
			updatedUser.email = Email;
			updatedUser.biography = Biography;
			dispatch(setUser(updatedUser));
			dispatch(
				addNotification({
					title: "Edit Profile",
					info: "Updated Profile Successfully!",
					color: "success",
				})
			);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Form className="d-flex flex-row justify-content-center mt-3">
			<Col sm={6}>
				<h1 className="display-5">Edit Profile</h1>
				<Col sm={6}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Email"
							value={Email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>
				</Col>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Biography</Form.Label>
					<Form.Control
						as="textarea"
						placeholder="Biography"
						rows={4}
						value={Biography}
						onChange={(e) => {
							setBiography(e.target.value);
						}}
					/>
				</Form.Group>
				<Button variant="success" type="submit" onClick={handleEditProfile}>
					Submit
				</Button>
			</Col>
		</Form>
	);
}
export default EditProfile;
