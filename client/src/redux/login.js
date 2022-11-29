import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
	name: "login",
	initialState: {
		token: "",
		userType: "",
	},
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload.token;
		},
		setUserType: (state, action) => {
			state.userType = action.payload.userType;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setToken, setUserType } = loginSlice.actions;

export default loginSlice.reducer;
