import Login from "./components/Login";
import Logout from "./components/Logout";
import Home from "./pages/Home";
import { useSelector } from "react-redux";

function App() {
	const userType = useSelector((state) => state.loginReducer).userType;
	return (
		<div className="App">
			{userType === "" && <Login />}
			<Home />
			{userType !== "" && <Logout />}
		</div>
	);
}

export default App;
