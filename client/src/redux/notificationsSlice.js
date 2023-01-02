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
			MySwal.fire({
				toast: true,
				position: 'bottom-end',
				showConfirmButton: false,
				timer: 4000,
				title: <strong>{action.payload.title}</strong>,
				html: <i>{action.payload.info}</i>,
				icon: action.payload.color,
				timerProgressBar: true,
				grow:'row'
			});
		},
	},
});

// Action creators are generated for each case reducer function
export const { addNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
