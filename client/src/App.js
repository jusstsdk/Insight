import { useSelector } from "react-redux";
import Login from "./components/Login";
import Logout from "./components/Logout";
import AdminView from "./components/AdminView";
import InstructorView from "./components/InstructorView";
import TraineeView from "./components/TraineeView";
import CorporateTraineeView from "./components/CorporateTraineeView";
function App() {
	const { token, userType } = useSelector((state) => state.loginReducer);

	return (
		<>
			{userType === "" && <Login />}
			{(() => {
				// Renders the appropriate View according to the logged in User.
				if (userType === "admin") {
					return <AdminView />;
				} else if (userType === "instructor") {
					return <InstructorView />;
				} else if (userType === "trainee") {
					return <TraineeView />;
				} else if (userType === "corporateTrainee") {
					return <CorporateTraineeView />;
				}
			})()}
			{userType !== "" && <Logout />}
		</>
	);
}

export default App;
