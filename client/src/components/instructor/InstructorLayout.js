import { Outlet} from "react-router-dom";
import InstructorNavbar from "./InstructorNavbar";

function InstructorLayout() {
	return (
		<>
			<InstructorNavbar />
			<Outlet />
		</>
	);
}

export default InstructorLayout;
