import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./redux/login";
import axios from "axios";
import Login from "./components/Login";
import { BrowserRouter } from "react-router-dom";
import AdminView from "./components/AdminView";
import TraineeView from "./components/TraineeView";
function App() {
	const { token, userType } = useSelector((state) => state.loginReducer);

	return (
		<div>
			{userType == "" && <Login />}
			{(() => {
				// Renders the appropriate View according to the logged in User.
				if (userType === "Admin") {
					return <AdminView />;
				} else if (userType === "Trainee") {
					return <TraineeView />;
				}
			})()}
		</div>
	);
}

export default App;
