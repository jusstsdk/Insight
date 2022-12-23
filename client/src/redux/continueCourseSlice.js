import { createSlice } from "@reduxjs/toolkit";

export const continueCourseSlice = createSlice({
	name: "continueCourse",
	initialState: {
		subtitleIndex: -1,
		selectedContentIndex: -1,
		content: {},
		contentType: "",
	},
	reducers: {
		setSubtitleIndex: (state, action) => {
			state.subtitleIndex = action.payload;
		},
		setContent: (state, action) => {
			state.content = action.payload;
		},
		setContentType: (state, action) => {
			state.contentType = action.payload;
		},
		setSelectedContentIndex: (state, action) => {
			state.selectedContentIndex = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setSubtitleIndex, setContent, setContentType, setSelectedContentIndex } =
	continueCourseSlice.actions;

export default continueCourseSlice.reducer;
