import { Routes } from "react-router-dom";
import CorporateTraineeLayout from "../components/corporateTrainee/CorporateTraineeLayout";

export function CorporateTraineeRoutes() {
	return (
		<>
			<Protected authorizedUserType={"corporateTrainee"}>
				<CorporateTraineeLayout />
				<Routes></Routes>
			</Protected>
		</>
	);
}
