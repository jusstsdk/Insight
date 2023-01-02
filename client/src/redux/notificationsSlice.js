import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const notificationsSlice = createSlice({
	name: "notifications",
	initialState: {
		notifications: [],
	},
	reducers: {
		addNotification: (state, action) => {
			
		},
	},
});

// Action creators are generated for each case reducer function
export const { addNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
