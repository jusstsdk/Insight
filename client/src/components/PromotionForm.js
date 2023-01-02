import { useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
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
		if(courses.length === 0) {
			dispatch(
				addNotification({
					title: "Selection error",
					info: "You must select at least one course.",
					color: "error",
				})
			);
			return;
		}
		if (startDate.current.value === "" || endDate.current.value === "" || discount.current.value === "" || discount.current.value <= 0 || discount.current.value > 100) {
			dispatch(
				addNotification({
					title: "Wrong information",
					info: "You must enter a start,end date, and an amount between 1 and 100.",
					color: "error",
				})
			);
			return;
		}

		if (endDate.current.value < startDate.current.value) {
			dispatch(
				addNotification({
					title: "You entered wrong information.",
					info: "Start date must be before end date.",
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
			<Form onSubmit={setPromotion} className="mb-3 row">
				<Col sm={3}>
					<Form.Group className="" >
						<Form.Label>Start Date of the promotion</Form.Label>
						<Form.Control
							type="date"
							ref={startDate}
							min={new Date().toISOString().slice(0, 10)}
						/>
					</Form.Group>
				</Col>
				<Col sm={3}>
					<Form.Group className="">
						<Form.Label>End Date of the promotion</Form.Label>
						<Form.Control
							type="date"
							ref={endDate}
							min={new Date().toISOString().slice(0, 10)}
						/>
					</Form.Group>
				</Col>
				<Col sm={3}>
					<Form.Group className="">
						<Form.Label>Discount Amount</Form.Label>
						<Form.Control
							placeholder="Amount"
							type="number"
							ref={discount}
							min="0"
							max="100"
						/>
					</Form.Group>
				</Col>
				<Col className="d-flex" sm={3}>
					<Button className="mt-auto" variant="primary" type="submit">
						Set Promotion
					</Button>
				</Col>
			</Form>
		</>
	);
}
