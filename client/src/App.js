import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./redux/login";
import axios from "axios";
function App() {
	const { token } = useSelector((state) => state.counter);
	const dispatch = useDispatch();
	const loginFunction = async () => {
		let token = localStorage.getItem("token");
		if (token == null || token == "") {
			console.log("NOT THERE");
			const config = {
				method: "post",
				url: "http://localhost:4000/api/users/login",
				headers: {},
				data: {
					username: "admin62",
					password: "pass1",
				},
			};

			let response = await axios(config);
			localStorage.setItem("token", JSON.stringify(response.data["x-auth-token"]));
			token = response.data["x-auth-token"];
		} else {
			console.log("THERE");
			console.log(token);
		}

		dispatch(setToken(token));
		// dispatch(setToken(response.data.token));
	};
	return (
		<div className="App">
			<h1>The token is {token}</h1>
			<button onClick={() => loginFunction()}> Login </button>
		</div>
	);
}

export default App;
