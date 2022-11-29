import { useSelector } from "react-redux";
import { setToken } from "./redux/login";
import Login from "./components/Login";
import AdminView from "./components/AdminView";
import InstructorView from "./components/InstructorView";
import TraineeView from "./components/TraineeView";
import CorporateTraineeView from "./components/CorporateTraineeView";
function App() {
	const { token, userType } = useSelector((state) => state.loginReducer);

	return (
		<div>
			{userType == "" && <Login />}
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
		</div>
	);
}

export default App;
