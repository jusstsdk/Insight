import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		token: "",
		type: "",
		user:{}
	},
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
		},
		setType: (state, action) => {
			state.type = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
		logout: (state) => {},
	},
});

// Action creators are generated for each case reducer function
export const { setToken, setType, setUser, logout } = userSlice.actions;

export default userSlice.reducer;
