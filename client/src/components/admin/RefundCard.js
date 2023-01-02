import { Button, Card, Col } from "react-bootstrap";
import { useState } from "react";
import api from "../../functions/api";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function RefundCard({ request, course }) {
	const [handled, setHandled] = useState(false);
	const trainee = request.trainee;
	const token = useSelector((state) => state.userReducer.token);
	const MySwal = withReactContent(Swal);

	async function handleRefund() {
		await api.put(
			"/administrators/refunds/" + request._id,
			{},
			{
				headers: { authorization: "Bearer " + token },
			}
		);
		setHandled(true);
		MySwal.fire({
			toast: true,
			position: "bottom-end",
			showConfirmButton: false,
			timer: 4000,
			title: <strong>Course Refunded</strong>,
			html: (
				<i>
					{"Course '" +
						course.title +
						"' refunded to " +
						trainee.username +
						".\n Amount refunded : " +
						request.paidPrice +
						"$"}
				</i>
			),
			icon: "success",
			timerProgressBar: true,
			grow: "row",
		});
	}

	return (
		<Card className="h-100">
			<Card.Body className=" d-flex flex-column justify-content-start">
				<Card.Title className="courseCardTitle">Username: {trainee.username}</Card.Title>

				<Card.Text className="priceLabel">Amount to be Refunded: {request.paidPrice} USD</Card.Text>

				<Col className="viewCourseButton d-flex  justify-content-end mt-auto" sm={2} md={2} lg={2}>
					{!handled && (
						<Button variant="primary" onClick={handleRefund}>
							Refund
						</Button>
					)}
					{handled && <h6 className="success">Granted</h6>}
				</Col>
			</Card.Body>
		</Card>
	);
}
export default RefundCard;
