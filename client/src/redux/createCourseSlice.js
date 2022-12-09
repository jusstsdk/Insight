import { createSlice } from "@reduxjs/toolkit";

export const createCourseSlice = createSlice({
	name: "createCourse",
	initialState: {
		info: {},

		examTitle: "",
		examQuestions: [],

		subtitles: [],
		subtitleTitle: "",
		subtitleHours: 0,

		subtitleVideos: [],
		subtitleExercises: [],

		exerciseTitle: "",
		exerciseQuestions: [],
	},
	reducers: {
		setInfo: (state, action) => {
			state.info = action.payload;
		},

		setExamTitle: (state, action) => {
			state.examTitle = action.payload;
		},
		addToExamQuestions: (state, action) => {
			state.examQuestions = [...state.examQuestions, action.payload];
		},
		removeExamQuestions: (state, action) => {
			state.examQuestions = state.examQuestions.filter((question, i) => i !== action.payload);
		},

		addSubtitle: (state, action) => {
			let newSubtitle = {
				title: state.subtitleTitle,
				hours: state.subtitleHours,
				videos: state.subtitleVideos,
				exercises: state.subtitleExercises,
			};
			state.subtitleTitle = "";
			state.subtitleHours = 0;
			state.subtitleVideos = [];
			state.subtitleExercises = [];
			state.subtitles = [...state.subtitles, newSubtitle];
		},

		removeSubtitle: (state, action) => {
			state.subtitles = state.subtitles.filter((subtitle, i) => i !== action.payload);
		},
		setSubtitleTitle: (state, action) => {
			state.subtitleTitle = action.payload;
		},
		setSubtitleHours: (state, action) => {
			state.subtitleHours = action.payload;
		},
		addExerciseToSubtitleExercises: (state, action) => {
			let newExercise = {
				title: state.exerciseTitle,
				questions: state.exerciseQuestions,
			};
			state.exerciseTitle = "";
			state.exerciseQuestions = [];
			state.subtitleExercises = [...state.subtitleExercises, newExercise];
		},
		removeExerciseFromSubtitleExercises: (state, action) => {
			state.subtitleExercises = state.subtitleExercises.filter(
				(exercise, i) => i !== action.payload
			);
		},

		addVideoToSubtitle: (state, action) => {
			state.subtitleVideos = [...state.subtitleVideos, action.payload];
		},

		removeSubtitleVideos: (state, action) => {
			state.subtitleVideos = state.subtitleVideos.filter((video, i) => i !== action.payload);
		},

		setExerciseTitle: (state, action) => {
			state.exerciseTitle = action.payload;
		},
		addToExerciseQuestions: (state, action) => {
			state.exerciseQuestions = [...state.exerciseQuestions, action.payload];
		},
		removeExerciseQuestions: (state, action) => {
			state.exerciseQuestions = state.exerciseQuestions.filter(
				(question, i) => i !== action.payload
			);
		},

		// // logout: (state) => {},
	},
});

// Action creators are generated for each case reducer function
export const {
	setInfo,
	setExamTitle,
	addToExamQuestions,
	removeExamQuestions,
	addSubtitle,
	setSubtitleTitle,
	setSubtitleHours,
	addVideoToSubtitle,
	removeSubtitleVideos,
	setExerciseTitle,
	addToExerciseQuestions,
	removeExerciseQuestions,
	addExerciseToSubtitleExercises,
	removeSubtitle,
	removeExerciseFromSubtitleExercises,
} = createCourseSlice.actions;

export default createCourseSlice.reducer;
