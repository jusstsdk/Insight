import { Button, Row, Col } from "react-bootstrap";
import API from "../../functions/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCourses } from "../../redux/userSlice";
import { addNotification } from "../../redux/notificationsSlice";
import { payFromWallet } from "../../redux/userSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function TraineeCoursePriceAlert(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const course = props.course;
	const courseID = course._id;
	const MySwal = withReactContent(Swal);
	//GET USER ID AND TYPE FOR WHEN REPORTING ETC
	const user = useSelector((state) => state.userReducer.user);
	const userID = useSelector((state) => state.userReducer.user._id);
	const currency = useSelector((state) => state.userReducer.user.currency);
	const exchangeRate = useSelector(
		(state) => state.userReducer.user.exchangeRate
	);

	async function handleTraineeBuyCourse() {
		let cost;
		if (
			course.promotion.endDate > new Date().toISOString() &&
			course.promotion.discount > 0
		) {
			cost = course.price;
		} else {
			cost = course.originalPrice;
		}
		if (cost === 0 || cost <= user.wallet * user.exchangeRate) {
			const response = await API.post(
				`/trainees/${userID}/courses/${courseID}/payment`
			);

			dispatch(payFromWallet(cost));

			dispatch(setCourses(response.data.courses));
			MySwal.fire({
				toast: true,
				position: 'bottom-end',
				showConfirmButton: false,
				timer: 4000,
				title: <strong>Sucesss</strong>,
				html: <i>You purchased the Course. You can now view all content!</i>,
				icon: "success",
				timerProgressBar: true,
				grow:'row'
			});
			navigate("/");
		} else {
			navigate("payment");
		}
	}

	return (
		<Row className="mb-0 h-100 mt-1 justify-content-end">
			<Col className="d-flex fitHeight justify-content-end">
				{course.promotion.discount &&
				course.promotion.discount !== 0 &&
				course.promotion.endDate >= new Date().toISOString() &&
				course.promotion.startDate <= new Date().toISOString() ? (
					<Col sm={12} className="d-flex flex-column align-items-end">
						<h4 className="fitWidth fw-bold">
							{course.price === 0 ? (
								"FREE"
							) : (
								<>
									{Math.trunc(course.price * exchangeRate * 100) / 100 +
										" " +
										currency}
									<h5 className="fitWidth">
										<del className="me-2 text-muted">
											{Math.trunc(course.originalPrice * exchangeRate * 100) /
												100}
										</del>
										<span className="error">{course.promotion.discount}%</span>{" "}
										OFF
									</h5>
								</>
							)}
						</h4>
					</Col>
				) : (
					<h3>
						{course.originalPrice === 0
							? "FREE"
							: Math.trunc(course.originalPrice * exchangeRate * 100) / 100 +
							  " " +
							  currency}
					</h3>
				)}
				<Button
					className="fitWidth fitHeight ms-2"
					variant="success"
					onClick={handleTraineeBuyCourse}
				>
					{course.originalPrice === 0 ? "Claim" : "Purchase"}
				</Button>
			</Col>
		</Row>
	);
}

export default TraineeCoursePriceAlert;
