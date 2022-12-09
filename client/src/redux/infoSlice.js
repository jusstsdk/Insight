import { createSlice } from "@reduxjs/toolkit";

export const infoSlice = createSlice({
	name: "addInfo",
	initialState: {
		title: "",
		summary: "",
		originalPrice: 0,
		previewVideo: "",
		subjects: [],
		instructors: [],
	},
	reducers: {
		setTitle: (state, action) => {
			state.title = action.payload;
		},
		setSummary: (state, action) => {
			state.summary = action.payload;
		},
		setOriginalPrice: (state, action) => {
			state.originalPrice = action.payload;
		},
		setPreviewVideo: (state, action) => {
			state.previewVideo = action.payload;
		},
		addSubject: (state, action) => {
			state.subjects = [...state.subjects, action.payload];
		},
		removeSubject: (state, action) => {
			state.subjects = state.subjects.filter((subject, i) => i !== action.payload);
		},
		setInstructors: (state, action) => {
			state.instructors = [...action.payload];
		},
		clearInfo: (state, action) => {
			state.title = "";
			state.summary = "";
			state.originalPrice = 0;
			state.previewVideo = "";
			state.subjects = [];
			state.instructors = [];
		},

		// // logout: (state) => {},
	},
});

// Action creators are generated for each case reducer function
export const {
	setTitle,
	setSummary,
	setOriginalPrice,
	setPreviewVideo,
	addSubject,
	removeSubject,
	setInstructors,
	clearInfo,
} = infoSlice.actions;

export default infoSlice.reducer;
