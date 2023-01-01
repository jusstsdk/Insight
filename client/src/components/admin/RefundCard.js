import {
	Button,
	Badge,
	Card,
	CardGroup,
	Col,
	Row,
	ListGroup,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Stars from "../Stars";
import api from "../../functions/api";
import { useSelector, useDispatch } from "react-redux";
import { addNotification } from "../../redux/notificationsSlice";
function RefundCard({ request, course }) {
	const [handled, setHandled] = useState(false);
	const [show, setShow] = useState(true);
	const trainee = request.trainee;
	const token = useSelector((state) => state.userReducer.token);
	const dispatch = useDispatch();

	async function handleRefund() {
		const response = await api.put(
			"/administrators/refunds/" + request._id,
			{},
			{
				headers: { authorization: "Bearer " + token },
			}
		);
		setHandled(true);
		dispatch(
			addNotification({
				title: "Course Refunded",
				info:
					"Course '" +
					course.title +
					"' refunded to " +
					trainee.username +
					".\n Amount refunded : " +
					request.paidPrice +
					"$",
				color: "success",
			})
		);
	}

	return (
		<Card bg="lightGrey" className="my-3">
			<Card.Body>
				{/* Title and Stars */}
				<CardGroup className=" align-items-center">
					<Card.Title className="courseCardTitle">
						{trainee.username}
					</Card.Title>
					<Col className="priceContainer d-flex justify-content-end"></Col>
				</CardGroup>

				{/* Summary and Price */}
				<CardGroup className="my-2">
					<h6 className="text-muted ">
						{trainee.firstName} {trainee.lastName}
					</h6>

					<Col
						className="viewCourseButton d-flex  justify-content-end"
						sm={2}
						md={2}
						lg={2}
					>
						{!handled && (
							<Button variant="outline-pinkish" onClick={handleRefund}>
								Refund
							</Button>
						)}
						{handled && <h6 className="success">Granted</h6>}
					</Col>
				</CardGroup>
				<CardGroup className="my-2">
					<Card.Text className="priceLabel">
						price paid : {request.paidPrice}$
					</Card.Text>
				</CardGroup>

				{/* Instructors and View Course*/}
			</Card.Body>
		</Card>
	);
}
export default RefundCard;
