import { configureStore } from "@reduxjs/toolkit";

import loginSlice from "./login";

export default configureStore({
	reducer: {
		// Define a top-level state field named `todos`, handled by `todosReducer`
		counter: loginSlice,
	},
});
