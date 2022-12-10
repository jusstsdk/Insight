import { useSelector } from "react-redux";
import PersonalInfo from "../../components/PersonalInfo";

import MyCourses from "../../components/trainee/MyCourses";


function TraineeView() {

	return (
		<>
			<PersonalInfo></PersonalInfo>
			<MyCourses />
		</>
	);
}

export default TraineeView;
