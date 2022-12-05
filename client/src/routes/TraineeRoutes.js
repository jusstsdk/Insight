import { Routes } from "react-router-dom";
import TraineeLayout from "../components/trainee/TraineeLayout";

export function TraineeRoutes() {
	return (
		<>
			<Protected authorizedUserType={"trainee"}>
				<TraineeLayout />
				<Routes></Routes>
			</Protected>
		</>
	);
}
