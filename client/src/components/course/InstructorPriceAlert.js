import { Alert, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function InstructorPriceAlert(props) {
	const course = props.course;
	const currency = useSelector((state) => state.userReducer.user.currency);

	return (
		<>
			<Alert variant="primary" className="lead">
				{course.promotion.discount &&
				course.promotion.discount !== 0 &&
				course.promotion.endDate >= new Date().toISOString() ? (
					<>
						{Math.trunc(course.price * 100) === 0 ? (
							<h5>FREE</h5>
						) : (
							<>
								Price:
								<h6>{course.price + currency}</h6>
								<p>
									<del>{course.originalPrice}</del>{" "}
									<span style={{ color: "red" }}>
										{course.promotion.discount + "% OFF"}
									</span>
								</p>
							</>
						)}
					</>
				) : (
					<h6 style={{ display: "inline-block" }}>
						{Math.trunc(course.originalPrice * 100) === 0.0
							? "FREE"
							: course.originalPrice + " " + currency}
					</h6>
				)}
			</Alert>
		</>
	);
}

export default InstructorPriceAlert;
