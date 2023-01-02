import { Alert, Button, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

function InstructorPriceAlert(props) {
	const course = props.course;
	const currency = useSelector((state) => state.userReducer.user.currency);
	const exchangeRate = useSelector(
		(state) => state.userReducer.user.exchangeRate
	);

	return (
		<>
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
								{Math.trunc(
									course.price * (exchangeRate ? exchangeRate : 1) * 100
								) /
									100 +
									" " +
									currency}
								<h5 className="fitWidth">
									<del className="me-2 text-muted">
										{Math.trunc(
											course.originalPrice *
												(exchangeRate ? exchangeRate : 1) *
												100
										) / 100}
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
						: Math.trunc(
								course.originalPrice * (exchangeRate ? exchangeRate : 1) * 100
						  ) /
								100 +
						  " " +
						  currency}
				</h3>
			)}
		</>
	);
}

export default InstructorPriceAlert;
