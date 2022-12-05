import { createSlice } from "@reduxjs/toolkit";

export const subtitleSlice = createSlice({
	name: "user",
	initialState: {
		title: "",
		hours: 0,
		exercises: [],
		videos: [],
	},
	reducers: {
		setTitle: (state, action) => {
			state.title = action.payload;
		},
		setHours: (state, action) => {
			state.hours = action.payload;
		},
		addExercise: (state, action) => {
			state.exercises = [...state.exercises, action.payload];
		},
		addVideo: (state, action) => {
			state.videos = [...state.videos, action.payload];
		},

		clearSubtitle: (state, action) => {
			state.title = "";
			state.hours = 0;
			state.exercises = [];
			state.videos = [];
		},
		// logout: (state) => {},
	},
});

// Action creators are generated for each case reducer function
export const { setTitle, setHours, addExercise, addVideo, clearSubtitle } = subtitleSlice.actions;

export default subtitleSlice.reducer;
