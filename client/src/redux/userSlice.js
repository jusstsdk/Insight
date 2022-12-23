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
		},
		setRequests: (state, action) => {
			state.user.requests = action.payload;
		},
		payFromWallet: (state, action) => {
			state.user.wallet -= action.payload;
		},
		watchVideo: (state, action) => {
			state.user.courses[action.payload.courseIndex].subtitles[action.payload.subtitleIndex].videos[
				action.payload.videoIndex
			].isWatched = true;
		},
		updateInstructorCourses: (state, action) => {
			state.user.courses = [...state.user.courses, action.payload];
		},
		resetMonthlyPay: (state) => {
			state.user.monthlyPay.amount = 0;
		},
		login: (state, action) => {
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
export const {
	setToken,
	setType,
	setUser,
	logout,
	login,
	setCountry,
	setCourses,
	setRequests,
	payFromWallet,resetMonthlyPay,
	watchVideo,
	updateInstructorCourses,
} = userSlice.actions;

export default userSlice.reducer;
