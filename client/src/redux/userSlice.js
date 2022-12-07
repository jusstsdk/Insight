import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		token: "",
		type: "guest",
		user: {
			country: "USA",
			currency: "USD",
		},
	},
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
		},
		setType: (state, action) => {
			state.type = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
		login: (state, action) => {
			localStorage.setItem("token", action.payload.type);
			localStorage.setItem("userType", action.payload.token);
			localStorage.setItem("user", JSON.stringify(action.payload.user));

			state.type = action.payload.type;
			state.token = action.payload.token;
			state.user = action.payload.user;
		},
		logout: (state) => {
			localStorage.clear();
			state.type = "guest";
			state.token = "";
			state.user = {
				country: "USA",
				currency: "USD",
			};
		},
	},
});

// Action creators are generated for each case reducer function
export const { setToken, setType, setUser, logout, login } = userSlice.actions;

export default userSlice.reducer;
