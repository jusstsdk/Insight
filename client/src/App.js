import Login from "./components/Login";
import Home from "./pages/Home";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken, setType } from "./redux/userSlice";
import Protected from "./components/Protected";

function App() {
	const dispatch = useDispatch();
	
	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUsertype = localStorage.getItem("userType");
		if (!(storedToken === null) && !(storedToken === "")) {
			dispatch(setToken(JSON.parse(storedToken)));
			dispatch(setType(JSON.parse(storedUsertype)));
		}
	}, []);

	return (
		<div className="App">
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route
					path="/home"
					element={
						<Protected>
							<Home />
						</Protected>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
