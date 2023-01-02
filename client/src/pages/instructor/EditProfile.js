import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Button } from "react-bootstrap";

import API from "../../functions/api";

import { setUser } from "../../redux/userSlice";
import { addNotification } from "../../redux/notificationsSlice";
import { useNavigate } from "react-router-dom";

function EditProfile() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const User = useSelector((state) => state.userReducer.user);
	const [Email, setEmail] = useState(
		useSelector((state) => state.userReducer.user.email)
	);
	const [Biography, setBiography] = useState(
		useSelector((state) => state.userReducer.user.biography)
	);

	const handleEditProfile = async () => {
		try {
			await API.put(`/instructors/${User._id}`, {
				email: Email,
				biography: Biography,
			});
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
			dispatch(
				addNotification({
					title: "Edit Profile",
					info: "Updating Profile Failed!",
					color: "error",
				})
			);
		}
		navigate("/instructor");
	};
	const BiographyRef = useRef();
	const resizeTextArea = () => {
		try {
			BiographyRef.current.style.height = "auto";
			BiographyRef.current.style.height =
				BiographyRef.current.scrollHeight + "px";
		} catch (err) {
			// console.log(err);
		}
	};
	useEffect(() => {
		resizeTextArea();
	}, [Biography]);

	return (
		<Form className="d-flex flex-row justify-content-center mt-3">
			<Col sm={6}>
				<h1 className="display-5">Edit Profile</h1>
				<Col sm={6}>
					<Form.Group className="mb-3">
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

				<Form.Group className="mb-3">
					<Form.Label>Biography</Form.Label>
					<Form.Control
						as="textarea"
						ref={BiographyRef}
						placeholder="Biography"
						rows={4}
						value={Biography}
						onChange={(e) => {
							setBiography(e.target.value);
						}}
					/>
				</Form.Group>
				<Button variant="primary" onClick={handleEditProfile}>
					Submit
				</Button>
			</Col>
		</Form>
	);
}
export default EditProfile;
