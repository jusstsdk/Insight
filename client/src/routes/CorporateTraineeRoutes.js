import { Routes, Route } from "react-router-dom";
import Layout from "../components/shared/Layout";
import Protected from "../components/shared/Protected";
import CorporateTraineeHome from "../pages/corporateTrainee/CorporateTraineeHome";
import CourseDetails from "../pages/sharedTrainee/CoursePage";
import Courses from "../pages/sharedTrainee/Courses";

export function CorporateTraineeRoutes() {
	return (
		<>
			<Protected authorizedUserType={"CorporateTrainee"}>
				<Routes>
					<Route path="" element={<Layout />}>
						<Route path="" element={<CorporateTraineeHome />} />
						<Route path="courses" element={<Courses />} />
						<Route path="courses/:id" element={<CourseDetails />} />
					</Route>
				</Routes>
			</Protected>
		</>
	);
}
