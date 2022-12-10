import { Routes, Route } from "react-router-dom";
import Layout from "../components/shared/Layout";
import Protected from "../components/shared/Protected";
import CorporateTraineeView from "../pages/corporateTrainee/CorporateTraineeView";
import CourseDetails from "../pages/corporateTrainee/CourseDetails";
import CourseList from "../pages/corporateTrainee/CourseList";

export function CorporateTraineeRoutes() {
	return (
		<>
			<Protected authorizedUserType={"corporateTrainee"}>
				<Layout />
				<Routes>
					<Route path="" element={<CorporateTraineeView />} />
					<Route path="courses" element={<CourseList />} />
					<Route path="courses/:id" element={<CourseDetails />} />
				</Routes>
			</Protected>
		</>
	);
}
