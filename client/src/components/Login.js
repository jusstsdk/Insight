import { useDispatch } from "react-redux";
import { setToken, setType, setUser } from "../redux/userSlice";
import axios from "axios";
import { useEffect, createRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
	const Username = createRef();
	const Password = createRef();
	const navigate = useNavigate();
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
				password: Password.current.value
			}
		};

		try {
			let response = await axios(config);
			let storedToken = response.data["x-auth-token"];
			let storedUserType = response.data["userType"];
			let storedUser = response.data["user"];
			localStorage.setItem("token", JSON.stringify(storedToken));
			localStorage.setItem("userType", JSON.stringify(storedUserType));
			localStorage.setItem("user", JSON.stringify(storedUser));

			dispatch(setToken(storedToken));
			dispatch(setType(storedUserType));
			dispatch(setUser(storedUser));
			navigate("/home");
		} catch (err) {
			console.log(err);
			setErrorNotFound(true);
		}
	};
	
	return (
		<div
			id="main-form"
			className="d-flex flex-column align-items-center text-center"
		>
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
							<div className="invalid-feedback">
								Please enter Email address and Password
							</div>
						)}
						{ErrorNotFound && (
							<div className="invalid-feedback">
								Wrong Email address or Password
							</div>
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
