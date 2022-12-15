import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import api from "../functions/api";

export default function Promotion({ courses }) {
	const startDate = useRef();
	const endDate = useRef();
	const discount = useRef();
    const userType = useSelector((state) => state.userReducer.type);

	async function setPromotion(e) {
		e.preventDefault();
		api.post("/promotion", {
			courses: courses,
			startDate: startDate,
			endDate: endDate,
			discount: discount,
			offeredBy: userType,
		});
	}

	return (
		<>
			<Form onSubmit={setPromotion}>
				<Form.Group className="mb-3" controlId="formBasicUsername">
					<Form.Label>Start Date of the promotion</Form.Label>
					<Form.Control type="date" ref={startDate} />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicUsername">
					<Form.Label>End Date of the promotion</Form.Label>
					<Form.Control type="date" ref={endDate} />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicUsername">
					<Form.Label>Discount Amount</Form.Label>
					<Form.Control
						type="number"
						ref={discount}
						min="0"
						max="100"
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Set Promotion
				</Button>
			</Form>
		</>
	);
}
