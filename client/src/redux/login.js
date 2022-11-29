import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
	name: "login",
	initialState: {
		token: "",
	},
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setToken } = loginSlice.actions;

export default loginSlice.reducer;
