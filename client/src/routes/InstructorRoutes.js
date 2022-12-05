import { Routes } from "react-router-dom";
import InstructorLayout from "../components/instructor/InstructorLayout";

export function InstructorRoutes() {
	return (
		<>
			<Protected authorizedUserType={"instructor"}>
                <InstructorLayout/>
				<Routes></Routes>
			</Protected>
		</>
	);
}
