import { Routes, Route } from "react-router-dom";
import Layout from "../components/shared/Layout";
import Protected from "../components/shared/Protected";
import CorporateTraineeView from "../pages/corporateTrainee/CorporateTraineeView";
import CourseDetails from "../pages/sharedTrainee/CoursePage";
import CourseList from "../pages/sharedTrainee/CourseList";

import Payment from "../pages/trainee/stripe/Payment";

export function CorporateTraineeRoutes() {
	return (
		<>
			<Protected authorizedUserType={"CorporateTrainee"}>
				<Routes>
					<Route path="" element={<Layout />}>
						<Route path="" element={<CorporateTraineeView />} />
						<Route path="courses" element={<CourseList />} />
						<Route path="courses/:id" element={<CourseDetails />} />
					</Route>
				</Routes>
			</Protected>
		</>
	);
}
