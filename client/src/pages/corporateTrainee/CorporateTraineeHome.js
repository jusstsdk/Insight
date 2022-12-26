import MyCourses from "../../components/MyCourses";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import PersonalInfo from "../../components/PersonalInfo";

export default function CorporateTraineeHome() {
	const { firstName, lastName, gender, courses, paymentMethods } = useSelector(
		(state) => state.userReducer.user
	);
	return (
		<>
			<PersonalInfo />
			<MyCourses />
		</>
	);
}
