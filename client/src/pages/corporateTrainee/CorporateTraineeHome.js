import MyCourses from "../../components/MyCourses";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function CorporateTraineeHome() {
	const { firstName, lastName, gender, courses, paymentMethods } = useSelector(
		(state) => state.userReducer.user
	);
	return (
		<>
			<Card>
				<Card.Body>
					<Card.Title>
						Hello, {firstName} {lastName}
					</Card.Title>
				</Card.Body>
			</Card>
			Your Courses:
			<MyCourses />
		</>
	);
}
