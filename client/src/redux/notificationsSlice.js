import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
	name: "notifications",
	initialState: {
		notifications: [],
	},
	reducers: {
		addNotification: (state, action) => {
			state.notifications = [...state.notifications, action.payload];
		},
		removeNotification: (state, action) => {
			state.notifications = state.notifications.filter((notification, i) => i !== action.payload);
		},
	},
});

// Action creators are generated for each case reducer function
export const { addNotification, removeNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
