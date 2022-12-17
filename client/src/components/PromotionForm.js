import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import api from "../functions/api";
import { addNotification } from "../redux/notificationsSlice";

export default function PromotionForm({ courses }) {
	const startDate = useRef();
	const endDate = useRef();
	const discount = useRef();
	const userType = useSelector((state) => state.userReducer.type);
	const dispatch = useDispatch();

	async function setPromotion(e) {
		e.preventDefault();

		if (endDate.current.value < startDate.current.value) {
			dispatch(
				addNotification({
					title: "You entered wrong information",
					info: "Start date must be before end date",
					color: "error",
				})
			);
			return;
		}

		const response = await api.post("/courses/promotion", {
			courses: courses,
			startDate: startDate.current.value,
			endDate: endDate.current.value,
			discount: discount.current.value,
			offeredBy: userType,
		});
		
		dispatch(
			addNotification({
				title: "Success",
				info: response.data,
				color: "success",
			})
		);
	}

	return (
		<>
			<Form onSubmit={setPromotion}>
				<Form.Group className="mb-3" controlId="formBasicUsername">
					<Form.Label>Start Date of the promotion</Form.Label>
					<Form.Control
						type="date"
						ref={startDate}
						min={new Date().toISOString().slice(0, 10)}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicUsername">
					<Form.Label>End Date of the promotion</Form.Label>
					<Form.Control
						type="date"
						ref={endDate}
						min={new Date().toISOString().slice(0, 10)}
					/>
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
