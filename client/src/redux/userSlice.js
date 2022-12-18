import { createSlice } from "@reduxjs/toolkit";
import api from "../functions/api";
import axios from "axios";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		token: "",
		type: "Guest",
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
			localStorage.setItem("user", JSON.stringify(action.payload));
			state.user = action.payload;
		},
		setCountry: (state, action) => {
			state.user.country = action.payload;
			if (state.type !== "Guest")
				api.put(`/${state.type}s/${state.user._id}`, {
					country: action.payload,
				});
		},
		setCourses: (state, action) => {
			state.user.courses = action.payload;
			localStorage.setItem("user", JSON.stringify(state.user));
		},
		setRequests: (state, action) => {
			state.user.requests = action.payload;
			localStorage.setItem("user", JSON.stringify(state.user));
		},
		payFromWallet: (state, action) => {
			state.user.wallet -= action.payload;
		},
		resetMonthlyPay: (state) => {
			state.user.monthlyPay.amount = 0;
		},
		login: (state, action) => {
			localStorage.setItem("token", action.payload.token);
			localStorage.setItem("userType", action.payload.type);
			localStorage.setItem("user", JSON.stringify(action.payload.user));

			state.type = action.payload.type;
			state.token = action.payload.token;
			state.user = action.payload.user;
		},
		logout: (state) => {
			localStorage.clear();
			state.type = "Guest";
			state.token = "";
			state.user = {
				country: "USA",
				currency: "USD",
			};
		},
	},
});

// Action creators are generated for each case reducer function
export const { setToken, setType, setUser, logout, login, setCountry, setCourses, setRequests, payFromWallet,resetMonthlyPay } =
	userSlice.actions;

export default userSlice.reducer;
