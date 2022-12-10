import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import MyCourses from "./corporateTrainee/MyCourses";

function PersonalInfo() {
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
					<Card.Text>
						Your Courses:
						
					</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
}

export default PersonalInfo;
