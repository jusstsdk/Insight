import { Routes, Route } from "react-router-dom";
import CoursePage from "../pages/sharedTrainee/CoursePage";
import TraineeView from "../pages/trainee/TraineeView";
import CourseList from "../pages/sharedTrainee/CourseList";
import Layout from "../components/shared/Layout";
import Payment from "../pages/trainee/stripe/Payment";
import Protected from "../components/shared/Protected";

export function TraineeRoutes() {
	return (
		<>
			<Protected authorizedUserType={"Trainee"}>
				<Layout />
				<Routes>
					<Route path="" element={<TraineeView />} />
					<Route path="courses" element={<CourseList />} />
					<Route path="courses/:id" element={<CoursePage />} />
					<Route path="courses/:id/payment/*" element={<Payment />} />
				</Routes>
			</Protected>
		</>
	);
}
