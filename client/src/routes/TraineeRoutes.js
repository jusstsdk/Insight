import { Routes, Route } from "react-router-dom";
import CourseTraineePOV from "../components/CourseTraineePOV";
import PersonalInfo from "../components/PersonalInfo";
import Protected from "../components/shared/Protected";
import Layout from "../components/shared/Layout";

export function TraineeRoutes() {
	return (
		<>
			<Protected authorizedUserType={"trainee"}>
				<Layout />
				<Routes>
					<Route path="" element={<PersonalInfo />} />
					<Route path="courses" element={<h1>wagdy page</h1>} />
					<Route path="courses/:id" element={<CourseTraineePOV />} />
				</Routes>
			</Protected>
		</>
	);
}
