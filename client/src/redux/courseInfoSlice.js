import { createSlice } from "@reduxjs/toolkit";

export const courseInfoSlice = createSlice({
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
		setInfo: (state, action) => {
			state.title = action.payload.title;
			state.summary = action.payload.summary;
			state.originalPrice = action.payload.originalPrice;
			state.previewVideo = action.payload.previewVideo;
			state.subjects = action.payload.subjects;
			state.instructors = action.payload.instructors;
		},
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
	},
});

// Action creators are generated for each case reducer function
export const {
	setInfo,
	setTitle,
	setSummary,
	setOriginalPrice,
	setPreviewVideo,
	addSubject,
	removeSubject,
	setInstructors,
	clearInfo,
} = courseInfoSlice.actions;

export default courseInfoSlice.reducer;
