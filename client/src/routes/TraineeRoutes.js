import { Routes, Route } from "react-router-dom";
import CourseTraineePOV from "../pages/corporateTrainee/CourseTraineePOV";
import TraineeView from "../pages/trainee/TraineeView";
import CourseList from "../pages/corporateTrainee/CourseList";
import Payment from "../pages/corporateTrainee/Payment";
import Layout from "../components/shared/Layout";
import Protected from "../components/shared/Protected";
export function TraineeRoutes() {
	return (
		<>
			<Protected authorizedUserType={"trainee"}>
				<Layout />
				<Routes>
					<Route path="" element={<TraineeView />} />
					<Route path="courses" element={<CourseList />} />
					<Route path="courses/:id" element={<CourseTraineePOV />} />
					<Route path="courses/:id/payment/*" element={<Payment />} />
				</Routes>
			</Protected>
		</>
	);
}
