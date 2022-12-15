import { createSlice } from "@reduxjs/toolkit";

export const createCourseSlice = createSlice({
	name: "createCourse",
	initialState: {
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
		// Needed
		setExamTitle: (state, action) => {
			state.examTitle = action.payload;
		},
		addToExamQuestions: (state, action) => {
			state.examQuestions = [...state.examQuestions, action.payload];
		},
		editExamQuestion: (state, action) => {
			state.examQuestions[action.payload.key] = action.payload.question;
		},
		removeExamQuestions: (state, action) => {
			state.examQuestions = state.examQuestions.filter((question, i) => i !== action.payload);
		},

		addSubtitle: (state, action) => {
			state.subtitles = [...state.subtitles, action.payload];
		},
		editSubtitleInfo: (state, action) => {
			console.log(action.payload);
			state.subtitles[action.payload.key].title = action.payload.subtitle.title;
			state.subtitles[action.payload.key].hours = action.payload.subtitle.hours;
		},
		removeSubtitle: (state, action) => {
			state.subtitles = state.subtitles.filter((subtitle, i) => i !== action.payload);
		},

		// Not sure
		// addSubtitle: (state, action) => {
		// 	let newSubtitle = {
		// 		title: state.subtitleTitle,
		// 		hours: state.subtitleHours,
		// 		videos: state.subtitleVideos,
		// 		exercises: state.subtitleExercises,
		// 	};
		// 	state.subtitleTitle = "";
		// 	state.subtitleHours = 0;
		// 	state.subtitleVideos = [];
		// 	state.subtitleExercises = [];
		// 	state.subtitles = [...state.subtitles, newSubtitle];
		// },

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
		clearCreateCourse: (state, action) => {
			state.examTitle = "";
			state.examQuestions = [];
			state.subtitles = [];
		},

		// // logout: (state) => {},
	},
});

// Action creators are generated for each case reducer function
export const {
	setInfo,
	setExamTitle,
	addToExamQuestions,
	editExamQuestion,
	removeExamQuestions,
	addSubtitle,
	editSubtitleInfo,
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
	clearCreateCourse,
} = createCourseSlice.actions;

export default createCourseSlice.reducer;
