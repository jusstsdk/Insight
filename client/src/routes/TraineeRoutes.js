import { Routes, Route } from "react-router-dom";
import CoursePage from "../pages/sharedTrainee/CoursePage";
import TraineeView from "../pages/trainee/TraineeView";
import Layout from "../components/shared/Layout";
import Payment from "../pages/trainee/stripe/Payment";
import Protected from "../components/shared/Protected";
import Courses from "../pages/sharedTrainee/Courses";

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
					</Route>
				</Routes>
			</Protected>
		</>
	);
}
