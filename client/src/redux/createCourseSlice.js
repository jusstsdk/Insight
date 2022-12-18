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
		setExamsAndSubtitles: (state, action) => {
			console.log(action.payload);
			state.examTitle = action.payload.exam.title;
			state.examQuestions = action.payload.exam.questions;
			state.subtitles = action.payload.subtitles;
		},
		// Exam
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

		// SubtitleInfo
		addSubtitle: (state, action) => {
			state.subtitles = [...state.subtitles, action.payload];
		},
		editSubtitleInfo: (state, action) => {
			state.subtitles[action.payload.key].title = action.payload.subtitle.title;
			state.subtitles[action.payload.key].hours = action.payload.subtitle.hours;
		},
		removeSubtitle: (state, action) => {
			state.subtitles = state.subtitles.filter((subtitle, i) => i !== action.payload);
		},

		// Videos
		addVideoToSubtitle: (state, action) => {
			state.subtitles[action.payload.subtitleKey].videos = [
				...state.subtitles[action.payload.subtitleKey].videos,
				action.payload.video,
			];
		},
		editVideoOfSubtitle: (state, action) => {
			state.subtitles[action.payload.subtitleKey].videos[action.payload.videoKey] =
				action.payload.video;
		},
		removeVideoFromSubtitle: (state, action) => {
			state.subtitles[action.payload.subtitleKey].videos = action.payload.newVideos;
		},

		// ExerciseInfo
		addExerciseToSubtitle: (state, action) => {
			state.subtitles[action.payload.subtitleKey].exercises = [
				...state.subtitles[action.payload.subtitleKey].exercises,
				action.payload.exercise,
			];
		},
		editExerciseOfSubtitle: (state, action) => {
			state.subtitles[action.payload.subtitleKey].exercises[action.payload.exerciseKey].title =
				action.payload.title;
		},
		removeExerciseFromSubtitle: (state, action) => {
			state.subtitles[action.payload.subtitleKey].exercises = action.payload.newExercises;
		},

		addQuestionToExercise: (state, action) => {
			state.subtitles[action.payload.subtitleKey].exercises[action.payload.exerciseKey].questions =
				[
					...state.subtitles[action.payload.subtitleKey].exercises[action.payload.exerciseKey]
						.questions,
					action.payload.question,
				];
		},
		editQuestionOfExercise: (state, action) => {
			state.subtitles[action.payload.subtitleKey].exercises[action.payload.exerciseKey].questions[
				action.payload.questionKey
			] = action.payload.question;
		},
		removeQuestionFromExercise: (state, action) => {
			state.subtitles[action.payload.subtitleKey].exercises[action.payload.exerciseKey].questions =
				action.payload.newQuestions;
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
		// addVideoToSubtitle: (state, action) => {
		// 	state.subtitleVideos = [...state.subtitleVideos, action.payload];
		// },
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
	setExamsAndSubtitles,
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
	editVideoOfSubtitle,
	removeVideoFromSubtitle,
	addExerciseToSubtitle,
	editExerciseOfSubtitle,
	removeExerciseFromSubtitle,
	addQuestionToExercise,
	editQuestionOfExercise,
	removeQuestionFromExercise,

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
