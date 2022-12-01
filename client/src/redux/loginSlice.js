import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
	name: "user",
	initialState: {
		token: "",
		type: "",
		id:""
	},
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload.token;
		},
		setType: (state, action) => {
			state.type = action.payload.userType;
		},
		logout: (state) => {},
	},
});

// Action creators are generated for each case reducer function
export const { setToken, setType: setUserType, logout } = loginSlice.actions;

export default loginSlice.reducer;
