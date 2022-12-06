import { Routes, Route } from "react-router-dom";
import CourseTraineePOV from "../components/CourseTraineePOV";
import TraineeLayout from "../components/trainee/TraineeLayout";
import PersonalInfo from "../components/PersonalInfo";
import Protected from "../components/Protected";

export function TraineeRoutes() {
	return (
		<>
			<Protected authorizedUserType={"trainee"}>
				<TraineeLayout />
				<Routes>
					<Route path="" element={<PersonalInfo />} />
					<Route path="courses" element={<h1>wagdy page</h1>} />
					<Route path="courses/:id" element={<CourseTraineePOV />} />
				</Routes>
			</Protected>
		</>
	);
}
