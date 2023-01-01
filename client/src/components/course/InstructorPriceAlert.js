import { Alert, Button, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

function InstructorPriceAlert(props) {
	const course = props.course;
	const currency = useSelector((state) => state.userReducer.user.currency);
	const exchangeRate = useSelector((state) => state.userReducer.user.exchangeRate);

	return (
		<>
			{course.promotion.discount &&
			course.promotion.discount !== 0 &&
			course.promotion.endDate >= new Date().toISOString() ? (
				<Col sm={7}>
					<h4 className="fitWidth fw-bold ms-auto">
						{(course.price === 0 ? "FREE" : (course.price * exchangeRate).toFixed(2)) +
							" " +
							currency}
					</h4>
					<h5 className="fitWidth ms-auto">
						<del className="me-2 text-muted">
							{(course.originalPrice * exchangeRate).toFixed(2)}
						</del>
						<span className="error">{course.promotion.discount}%</span> OFF
					</h5>
				</Col>
			) : (
				<h3>
					{course.originalPrice === 0
						? "FREE"
						: course.originalPrice * exchangeRate + " " + currency}
				</h3>
			)}
		</>
	);
}

export default InstructorPriceAlert;
