import { Button, Form, Modal } from "react-bootstrap";

import { useRef } from "react";
import API from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { setUser } from "../../redux/userSlice";

function Payment() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	let courseId = params.id;
	const userID = useSelector((state) => state.userReducer.user._id);
	const trainee = useSelector((state) => state.userReducer.user);
	const cardName = useRef();
	const cardNumber = useRef();
	const expiryMonth = useRef();
	const expiryYear = useRef();
	const cvv = useRef();

	const [show, setShow] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		console.log(cardName);
		const response = await API.post(
			`/trainees/${userID}/courses/${courseId}/payment`,
			{
				data: {
					cardName: cardName.current.value,
					cardNumber: cardNumber.current.value,

					expiryMonth: expiryMonth.current.value,
					expiryYear: expiryYear.current.value,
					cvv: cvv.current.value,
				},
			}
		);
		// console.log(trainee.courses);
		// newTrainee.courses.push(response.data);
		// dispatch(setUser(newTrainee));
		setShow(true);
	}

	return (
		<>
			<Form>
				<Form.Group className="mb-3" controlId="cardName">
					<Form.Label>Card Holder</Form.Label>
					<Form.Control
						ref={cardName}
						type="text"
						placeholder="Card Holder"
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="cardNumber">
					<Form.Label>Card Number</Form.Label>
					<Form.Control
						ref={cardNumber}
						type="text"
						placeholder="Card Number"
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="expiryMonth">
					<Form.Label>Expiry month</Form.Label>
					<Form.Control
						ref={expiryMonth}
						type="number"
						placeholder="MM"
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="expiryYear">
					<Form.Label>Expiry year Number</Form.Label>
					<Form.Control
						ref={expiryYear}
						type="number"
						placeholder="YY"
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="cvv">
					<Form.Label>CVV</Form.Label>
					<Form.Control ref={cvv} type="number" placeholder="" />
				</Form.Group>

				<Button variant="primary" type="submit" onClick={handleSubmit}>
					Buy Course
				</Button>
			</Form>

			<Modal show={show} backdrop="static" keyboard={false} centered>
				<Modal.Body>
					payment successful ,you have been enrolled in the course.
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={navigate("/courses")}>
						find more courses
					</Button>

					<Button variant="primary" onClick={navigate("/")}>
						Home
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Payment;
