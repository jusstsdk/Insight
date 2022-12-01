import { useDispatch } from "react-redux";
import { setToken, setType } from "../redux/loginSlice";
import axios from "axios";
import { useEffect, createRef, useState } from "react";
function Login() {
	const Username = createRef();
	const Password = createRef();

	const [ErrorNotFound, setErrorNotFound] = useState(false);
	const [MissingInputs, setMissingInputs] = useState(false);
	const dispatch = useDispatch();
	const loginFunction = async () => {
		let username = Username.current.value;
		let password = Password.current.value;
		if (username === "" || password === "") {
			setMissingInputs(true);
			setErrorNotFound(false);
			return;
		} else {
			setMissingInputs(false);
		}
		const config = {
			method: "POST",
			url: "http://localhost:4000/api/users/login",
			headers: {},
			data: {
				username: Username.current.value,
				password: Password.current.value,
			},
		};
		try {
			let response = await axios(config);
			let storedToken = response.data["x-auth-token"];
			let storedUsertype = response.data["userType"];
			localStorage.setItem("token", JSON.stringify(storedToken));
			localStorage.setItem("userType", JSON.stringify(storedUsertype));

			dispatch(setToken(storedToken));
			dispatch(setType(storedUsertype));
		} catch (err) {
			setErrorNotFound(true);
		}
	};
	useEffect(() => {
		let storedToken = localStorage.getItem("token");
		let storedUsertype = localStorage.getItem("userType");
		if (!(storedToken === null) && !(storedToken === "")) {
			dispatch(setToken(JSON.parse(storedToken) ));
			dispatch(setType(JSON.parse(storedUsertype) ));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div id="main-form" className="d-flex flex-column align-items-center text-center">
			{/* Sign in Form */}
			<main className="form-signin">
				<form>
					{/* Title */}
					<h1 id="login-page-title" className="align-self-center">
						Coursera hehe
					</h1>
					{/* Form Header */}
					<h1 className="h3 mb-3 fw-normal">Please Sign in</h1>
					{/* Username Input */}
					<div className="form-floating">
						<input
							type="text"
							className="form-control"
							id="floatingInput"
							placeholder="Username"
							ref={Username}
						/>
						{/* <input placeholder="Username" ref={Username} /> */}
						<label htmlFor="floatingInput">Username</label>
					</div>
					{/* Password Input */}
					<div className="form-floating">
						<input
							type="password"
							className="form-control"
							id="floatingPassword"
							placeholder="Password"
							ref={Password}
						/>
						<label htmlFor="floatingPassword">Password</label>
					</div>
					{/* Error Messages */}
					<div className="d-flex justify-content-center">
						{MissingInputs && (
							<div className="invalid-feedback">Please enter Email address and Password</div>
						)}
						{ErrorNotFound && (
							<div className="invalid-feedback">Wrong Email address or Password</div>
						)}
					</div>

					{/* Sign in Button */}
					<button
						id="loginButton"
						className="w-100 btn btn-lg btn-primary"
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							loginFunction();
						}}
					>
						Sign in
					</button>
				</form>
			</main>
		</div>
	);
}

export default Login;
