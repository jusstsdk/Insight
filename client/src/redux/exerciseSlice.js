import { createSlice } from "@reduxjs/toolkit";

export const exerciseSlice = createSlice({
	name: "user",
	initialState: {
		exerciseTitle: "",
		questions: [],
	},
	reducers: {
		setExerciseTitle: (state, action) => {
			state.exerciseTitle = action.payload;
		},
		addQuestions: (state, action) => {
			state.questions = [...state.questions, action.payload];
		},
		removeQuestions: (state, action) => {
			state.questions = action.payload;
		},
		clearExercise: (state, action) => {
			state.exerciseTitle = "";
			state.questions = [];
		},
		// logout: (state) => {},
	},
});

// Action creators are generated for each case reducer function
export const { setExerciseTitle, addQuestions, removeQuestions, clearExercise } =
	exerciseSlice.actions;

export default exerciseSlice.reducer;
