import { Alert, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function InstructorPriceAlert(props) {
	const course = props.course;
	const currency = useSelector((state) => state.userReducer.user.currency);

	return (
		<>
			<Alert variant="primary" className="lead">
				Price:
				{course.discount && course.discount !== 0 ? (
					<>
						<h1>{"" + course.price + " " + currency}</h1>
						<del>{course.originalPrice}</del>{" "}
						<span>{"" + course.discount + "% OFF"}</span>
					</>
				) : (
					<h1>{course.originalPrice + " " + currency}</h1>
				)}{" "}
			</Alert>
		</>
	);
}

export default InstructorPriceAlert;
