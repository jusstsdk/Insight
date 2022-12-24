import { Routes, Route } from "react-router-dom";
import CoursePage from "../pages/sharedTrainee/CoursePage";
import TraineeView from "../pages/trainee/TraineeHome";
import Layout from "../components/shared/Layout";
import Payment from "../pages/trainee/stripe/Payment";
import Protected from "../components/shared/Protected";
import Courses from "../pages/sharedTrainee/Courses";
import ViewSubtitle from "../pages/sharedTrainee/ViewSubtitle";
import ChangePassword from "../components/shared/ChangePassword";

export function TraineeRoutes() {
	return (
		<>
			<Protected authorizedUserType={"Trainee"}>
				<Routes>
					<Route path="" element={<Layout />}>
						<Route path="" element={<TraineeView />} />
						<Route path="courses" element={<Courses />} />
						<Route path="courses/:id" element={<CoursePage />} />
						<Route path="courses/:id/payment/*" element={<Payment />} />
						<Route path="courses/:id/viewSubtitle" element={<ViewSubtitle />} />
						<Route path="changePassword" element={<ChangePassword />} />
					</Route>
				</Routes>
			</Protected>
		</>
	);
}
