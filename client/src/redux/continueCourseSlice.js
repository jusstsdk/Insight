import { createSlice } from "@reduxjs/toolkit";

export const continueCourseSlice = createSlice({
	name: "continueCourse",
	initialState: {
		subtitleIndex: -1,
		selectedContentIndex: -1,
		content: {},
		contentType: "",
		isSolved: false,
		answers: [],
		solve: false,
		grade: -1,
		oldGrade: -1,
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
		initializeAnswers: (state, action) => {
			state.answers = action.payload;
		},
		updateAnswer: (state, action) => {
			state.answers[action.payload.answerIndex] = action.payload.answer;
		},
		setIsSolved: (state, action) => {
			state.isSolved = action.payload;
		},
		setSolve: (state, action) => {
			state.solve = action.payload;
		},
		setGrade: (state, action) => {
			state.grade = action.payload;
		},
		setOldGrade: (state, action) => {
			state.oldGrade = action.payload;
		},
		resetExerciseInfo: (state, action) => {
			state.solve = false;
			state.isSolved = false;
			state.grade = -1;
			state.oldGrade = action.payload.oldGrade;
			state.answers = action.payload.answers;
		},
		setContentInfo: (state, action) => {
			state.subtitleIndex = action.payload.subtitleIndex;
			state.selectedContentIndex = action.payload.selectedContentIndex;
			state.content = action.payload.content;
			state.contentType = action.payload.contentType;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setSubtitleIndex,
	setContent,
	setContentType,
	setSelectedContentIndex,
	initializeAnswers,
	updateAnswer,
	setIsSolved,
	setSolve,
	setGrade,
	setOldGrade,
	resetExerciseInfo,
	setContentInfo,
} = continueCourseSlice.actions;

export default continueCourseSlice.reducer;
