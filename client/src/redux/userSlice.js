import { createSlice } from "@reduxjs/toolkit";
import api from "../functions/api";

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
		watchVideo: (state, action) => {
			state.user.courses[action.payload.courseIndex].subtitles[action.payload.subtitleIndex].videos[
				action.payload.videoIndex
			].isWatched = true;
		},
		addNoteToVideoNotes: (state, action) => {
			state.user.courses[action.payload.courseIndex].subtitles[action.payload.subtitleIndex].videos[
				action.payload.videoIndex
			].notes = [
				...state.user.courses[action.payload.courseIndex].subtitles[action.payload.subtitleIndex]
					.videos[action.payload.videoIndex].notes,
				action.payload.note,
			];
		},
		deleteNoteFromVideoNotes: (state, action) => {
			let newNotes = state.user.courses[action.payload.courseIndex].subtitles[
				action.payload.subtitleIndex
			].videos[action.payload.videoIndex].notes.filter((_, i) => i !== action.payload.noteIndex);

			state.user.courses[action.payload.courseIndex].subtitles[action.payload.subtitleIndex].videos[
				action.payload.videoIndex
			].notes = newNotes;
			// state.notifications = state.notifications.filter((notification, i) => i !== action.payload);
		},
		solveExercise: (state, action) => {
			state.user.courses[action.payload.courseIndex].subtitles[
				action.payload.subtitleIndex
			].exercises[action.payload.exerciseIndex] = {
				...state.user.courses[action.payload.courseIndex].subtitles[action.payload.subtitleIndex]
					.exercises[action.payload.exerciseIndex],
				isSolved: true,
			};
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
export const {
	setToken,
	setType,
	setUser,
	logout,
	login,
	setCountry,
	setCourses,
	setRequests,
	payFromWallet,
	watchVideo,
	addNoteToVideoNotes,
	deleteNoteFromVideoNotes,
	solveExercise,
} = userSlice.actions;

export default userSlice.reducer;
