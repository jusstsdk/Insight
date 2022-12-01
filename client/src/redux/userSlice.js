import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		token: "",
		type: "",
		id:""
	},
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
		},
		setType: (state, action) => {
			state.type = action.payload;
		},
		logout: (state) => {},
	},
});

// Action creators are generated for each case reducer function
export const { setToken, setType, logout } = userSlice.actions;

export default userSlice.reducer;
